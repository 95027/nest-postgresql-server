import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  getAllUsers(): Promise<User[]> {
    return this.userRepo.find();
  }

  async getUserById(id: number): Promise<User | null> {
    const user = await this.userRepo.findOneBy({ id });

    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  createUser(user: Partial<User>): Promise<User> {
    const newUser = this.userRepo.create(user);
    return this.userRepo.save(newUser);
  }

  async updateUser(id: number, data: Partial<User>): Promise<any> {
    const existing = await this.userRepo.findOneBy({ id });

    if (!existing) {
      throw new NotFoundException('User not found');
    }

    await this.userRepo.update(id, data);
    return this.userRepo.findOneBy({ id });
  }

  async destroyUser(id: number): Promise<void> {
    const user = await this.userRepo.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`User not found`);
    }

    await this.userRepo.delete(id);
  }
}
