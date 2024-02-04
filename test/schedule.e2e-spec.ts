import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { CreateRoomDto } from '../src/room/dto/create-room.dto';
import { RoomAmount, RoomType } from '../src/room/room.entity';
import TestDb from './db-for-tests';
import { getConnectionToken } from '@nestjs/mongoose';
import { ExceptionCodes } from '../src/exceptions/codes';
import { ExceptionMessages } from '../src/exceptions/messages';

const roomNumber = 1;

const createRoomDto: CreateRoomDto = {
  number: roomNumber,
  roomType: 'BUDGET' as RoomType,
  roomsAmount: 2 as RoomAmount,
  hasSeeView: false,
};

const createScheduleDto = {
  room: roomNumber,
  date: '2017-06-07',
};

describe('ScheduleController (e2e)', () => {
  let app: INestApplication;
  let testDb: TestDb;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
        transformOptions: { enableImplicitConversion: true },
      }),
    );
    await app.init();
    const connection = await moduleFixture.get(getConnectionToken());
    testDb = await new TestDb(connection);
  });

  afterAll(async () => {
    await testDb.clear(['roommodels', 'schedulemodels']);
    app.close();
  });

  it('/schedule (POST) success', async () => {
    await request(app.getHttpServer()).post('/room').send(createRoomDto);

    return request(app.getHttpServer())
      .post('/schedule')
      .send(createScheduleDto)
      .expect(HttpStatus.CREATED)
      .then(({ body }: request.Response) => {
        expect(body.id).toBeDefined();
        expect(body.date).toEqual(`${createScheduleDto.date}T00:00:00.000Z`);
        expect(body.room.number).toEqual(createScheduleDto.room);
      });
  });

  it('/schedule (POST) unsuccess', async () => {
    return request(app.getHttpServer())
      .post('/schedule')
      .send(createScheduleDto)
      .expect(HttpStatus.BAD_REQUEST)
      .then(({ body }: request.Response) => {
        expect(body.message.code).toEqual(ExceptionCodes.BAD_REQUEST);
        expect(body.message.message).toEqual(
          ExceptionMessages.SCHEDULE_ALREDY_EXIST,
        );
      });
  });

  it('/schedule/findByRoom/:number (GET) success', async () => {
    await request(app.getHttpServer())
      .post('/schedule')
      .send({ ...createScheduleDto, date: '2017-06-08' });
    return request(app.getHttpServer())
      .get('/schedule/findByRoom/1')
      .expect(HttpStatus.OK)
      .then(({ body }: request.Response) => {
        expect(body.length).toEqual(2);
        expect(body[0].date).toEqual(`${createScheduleDto.date}T00:00:00.000Z`);
        expect(body[1].date).toEqual(`2017-06-08T00:00:00.000Z`);
        expect(body[1].room.number).toEqual(1);
      });
  });

  it('/schedule (GET) success', async () => {
    await request(app.getHttpServer())
      .post('/schedule')
      .send({ ...createScheduleDto, date: '2017-06-09' });

    return request(app.getHttpServer())
      .get('/schedule?page=1&pageSize=2&sortDirection=asc')
      .expect(HttpStatus.OK)
      .then(({ body }: request.Response) => {
        expect(body.schedules?.length).toEqual(2);
        expect(body.page).toEqual(1);
        expect(body.totalPages).toEqual(2);
      });
  });

  it('/schedule/:id (DELETE)', async () => {
    let scheduleId;
    let roomNumber;

    await request(app.getHttpServer())
      .get('/schedule/findByRoom/1')
      .then(({ body }: request.Response) => {
        scheduleId = body[0].id;
        roomNumber = body[0].room.number;
      });

    await request(app.getHttpServer())
      .delete(`/schedule/${scheduleId}`)
      .expect(HttpStatus.OK)
      .then(({ body }: request.Response) => {
        expect(body.id).toEqual(scheduleId);
      });

    return request(app.getHttpServer())
      .delete(`/schedule/${scheduleId}`)
      .expect(HttpStatus.NOT_FOUND)
      .then(({ body }: request.Response) => {
        expect(body.message.code).toEqual(ExceptionCodes.NOT_FOUND);
        expect(body.message.message).toEqual(
          ExceptionMessages.SCHEDULE_NOT_FOUND,
        );
      });
  });
});
