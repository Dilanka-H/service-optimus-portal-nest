import { Injectable } from '@nestjs/common';

type User = {
  userId: number,
  username: string,
  password: string
}

const users : User [] = [
  {
    userId: 1,
    username: 'Dolo',
    password: 'Dolo123'
  }, 
  {
    userId: 2,
    username: 'Polo',
    password: 'Polo123'
  }
]
@Injectable()
export class UserService {
  getUser() {
    return { username: 'John Doe' };
  }
  async findUserByName(username: string): Promise<User>|undefined {
    return users.find((user) => user.username === username)
  }
}
