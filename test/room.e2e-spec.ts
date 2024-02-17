import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { CreateRoomDto } from '../src/room/dto/create-room.dto';
import { RoomAmount, RoomType } from '../src/room/room.entity';
import { ExceptionCodes } from '../src/exceptions/codes';
import { ExceptionMessages } from '../src/exceptions/messages';
import TestDb from './db-for-tests';
import { getConnectionToken } from '@nestjs/mongoose';

const roomNumber = 1;

const createTestDto: CreateRoomDto = {
  number: roomNumber,
  roomType: RoomType.BUDGET,
  roomsAmount: RoomAmount.TWO,
  hasSeeView: false,
};

describe('RoomController (e2e)', () => {
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
    await testDb.clear(['roommodels']);
    await app.close();
  });

  it('/room (POST) success', () => {
    return request(app.getHttpServer())
      .post('/room')
      .send(createTestDto)
      .expect(HttpStatus.CREATED)
      .then(({ body }: request.Response) => {
        expect(body.id).toBeDefined();
        expect(body.number).toEqual(roomNumber);
        expect(body.roomType).toEqual(createTestDto.roomType);
        expect(body.roomsAmount).toEqual(createTestDto.roomsAmount);
        expect(body.hasSeeView).toEqual(createTestDto.hasSeeView);
      });
  });

  it('/room (POST) unsuccess', () => {
    return request(app.getHttpServer())
      .post('/room')
      .send(createTestDto)
      .expect(HttpStatus.BAD_REQUEST)
      .then(({ body }: request.Response) => {
        expect(body.message?.code).toEqual(ExceptionCodes.BAD_REQUEST);
        expect(body.message?.message).toEqual(
          ExceptionMessages.ROOM_ALREADY_EXIST,
        );
      });
  });

  it('/room (POST) incorrect input data', () => {
    const errorMessages = [
      'property unknown should not exist',
      'number must be a positive number',
      'roomType must be one of the following values: BUDGET, MIDDLE, LUKS',
      'roomsAmount must be one of the following values: 1, 2, 3, 4',
    ];

    const createDto = {
      hasSeeView: 'hello',
      roomsAmount: 400,
      number: -1,
      roomType: 'LUKSs',
      unknown: 'unknown',
    };

    return request(app.getHttpServer())
      .post('/room')
      .send(createDto)
      .expect(HttpStatus.BAD_REQUEST)
      .then(({ body }: request.Response) => {
        body.message.forEach((m) => {
          expect(errorMessages.includes(m)).toBeTruthy();
        });
      });
  });

  it('/room/:number (GET) success', () => {
    return request(app.getHttpServer())
      .get(`/room/${roomNumber}`)
      .expect(HttpStatus.OK)
      .then(({ body }: request.Response) => {
        expect(body.id).toBeDefined();
        expect(body.number).toEqual(roomNumber);
        expect(body.roomType).toEqual(createTestDto.roomType);
        expect(body.roomsAmount).toEqual(createTestDto.roomsAmount);
        expect(body.hasSeeView).toEqual(createTestDto.hasSeeView);
      });
  });

  it('/room/:number (GET) incorrect input data', () => {
    const errorMessage = 'Validation failed (numeric string is expected)';

    return request(app.getHttpServer())
      .get(`/room/one`)
      .expect(HttpStatus.BAD_REQUEST)
      .then(({ body }: request.Response) => {
        expect(body.message).toEqual(errorMessage);
      });
  });

  it('/room (GET) success', async () => {
    await request(app.getHttpServer())
      .post('/room')
      .send({ ...createTestDto, number: roomNumber + 1 });

    await request(app.getHttpServer())
      .post('/room')
      .send({ ...createTestDto, number: roomNumber + 2 });

    return request(app.getHttpServer())
      .get('/room?page=1&pageSize=2&sortDirection=asc')
      .expect(HttpStatus.OK)
      .then(({ body }: request.Response) => {
        expect(body.rooms?.length).toEqual(2);
        expect(body.page).toEqual(1);
        expect(body.totalPages).toEqual(2);
      });
  });

  it('/room (GET) incorrect input data', async () => {
    const errorMessages = [
      'page must be a positive number',
      'page must be a number conforming to the specified constraints',
      'pageSize must be a positive number',
      'pageSize must be a number conforming to the specified constraints',
      'sortDirection must be one of the following values: asc, desc',
    ];

    return request(app.getHttpServer())
      .get('/room?page=one&pageSize=two&sortDirection=descask')
      .expect(HttpStatus.BAD_REQUEST)
      .then(({ body }: request.Response) => {
        body.message.forEach((m) => {
          expect(errorMessages.includes(m)).toBeTruthy();
        });
      });
  });

  it('room/:number (DELETE) success', async () => {
    return request(app.getHttpServer())
      .delete('/room/1')
      .expect(HttpStatus.OK)
      .then(({ body }: request.Response) => {
        expect(body.id).toBeDefined();
        expect(body.number).toEqual(roomNumber);
        expect(body.roomType).toEqual(createTestDto.roomType);
        expect(body.roomsAmount).toEqual(createTestDto.roomsAmount);
        expect(body.hasSeeView).toEqual(createTestDto.hasSeeView);
      });
  });

  it('/room/:number (DELETE) unsuccess', async () => {
    return request(app.getHttpServer())
      .delete('/room/1')
      .expect(HttpStatus.NOT_FOUND)
      .then(({ body }: request.Response) => {
        expect(body.message.code).toEqual(ExceptionCodes.NOT_FOUND);
        expect(body.message.message).toEqual(ExceptionMessages.ROOM_NOT_FOUND);
      });
  });

  it('/room (PUT) success', async () => {
    let newNumber = roomNumber + 10;
    let roomId;

    await request(app.getHttpServer())
      .get('/room/2')
      .then(({ body }: request.Response) => {
        roomId = body.id;
      });

    await request(app.getHttpServer())
      .put('/room')
      .send({ ...createTestDto, number: newNumber, id: roomId })
      .expect(HttpStatus.OK)
      .then(({ body }: request.Response) => {
        expect(body.number).toEqual(newNumber);
      });

    await request(app.getHttpServer())
      .get(`/room/${newNumber}`)
      .expect(HttpStatus.OK);
  });

  it('/room (PUT) unsuccess', async () => {
    let newNumber = 3;
    let roomId;

    await request(app.getHttpServer())
      .get(`/room/${roomNumber + 10}`)
      .then(({ body }: request.Response) => {
        roomId = body.id;
      });

    await request(app.getHttpServer())
      .put('/room')
      .send({ ...createTestDto, number: newNumber, id: roomId })
      .expect(HttpStatus.BAD_REQUEST)
      .then(({ body }: request.Response) => {
        expect(body.message.code).toEqual(ExceptionCodes.BAD_REQUEST);
        expect(body.message.message).toEqual(
          ExceptionMessages.ROOM_ALREADY_EXIST,
        );
      });
  });
});
