export enum ExceptionMessages {
  INTERNAL_SERVER_ERROR = 'Internal Server Error',
  ROOM_NOT_FOUND = 'Комната не найдена',
  ROOM_ALREADY_EXIST = 'Комната уже существует',

  SCHEDULE_ALREDY_EXIST = 'Бронирование данной комнаты на указанную дату уже существует',
  SCHEDULE_NOT_FOUND = 'Бронирование не найдено',
  INVALID_ID = 'Id is not valid',

  USER_NOT_FOUND = 'Пользователь не найден',
  USER_ALREADY_EXIST = 'Пользователь уже зарегистрирован',
  UNAUTHORIZED_USER = 'Неверное имя пользователя или пароль',
}
