import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { Roles, Session } from '@thallesp/nestjs-better-auth';
import type { UserSession } from '@thallesp/nestjs-better-auth';
import { prisma } from '../auth.js';
import { UserRole } from './generated/prisma/enums.js';

@Controller('admin')
@Roles(['ADMIN'])
export class AdminController {
  @Get('me')
  getAdminSession(@Session() session: UserSession) {
    return {
      user: session.user,
      session: session.session,
    };
  }

  @Patch('me')
  updateAdminProfile(@Session() session: UserSession, @Body() body: { name?: string }) {
    return prisma.user.update({
      where: { id: session.user.id },
      data: { name: String(body.name ?? '').trim() || session.user.name },
      select: { id: true, name: true, email: true, role: true },
    });
  }

  @Get('dashboard')
  async getDashboard() {
    const [registrations, contacts, users, categoryCounts, recentRegistrations] = await Promise.all([
      prisma.playerRegistration.count(),
      prisma.contactMessage.count(),
      prisma.user.count(),
      prisma.playerRegistration.groupBy({ by: ['category'], _count: { _all: true } }),
      prisma.playerRegistration.findMany({ orderBy: { createdAt: 'desc' }, take: 5 }),
    ]);

    return {
      totals: { registrations, contacts, users },
      categories: Object.fromEntries(categoryCounts.map((item) => [item.category, item._count._all])),
      recentRegistrations,
    };
  }

  @Get('registrations')
  getRegistrations() {
    return prisma.playerRegistration.findMany({ orderBy: { createdAt: 'desc' } });
  }

  @Get('registrations/:id')
  getRegistration(@Param('id') id: string) {
    return prisma.playerRegistration.findUnique({ where: { id } });
  }

  @Get('contacts')
  getContacts() {
    return prisma.contactMessage.findMany({ orderBy: { createdAt: 'desc' } });
  }

  @Get('users')
  getUsers() {
    return prisma.user.findMany({
      select: { id: true, name: true, email: true, role: true, createdAt: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  @Patch('users/:id/role')
  updateUserRole(@Param('id') id: string, @Body() body: { role?: string }) {
    const role = body.role === UserRole.ADMIN ? UserRole.ADMIN : UserRole.USER;
    return prisma.user.update({
      where: { id },
      data: { role },
      select: { id: true, name: true, email: true, role: true, createdAt: true },
    });
  }
}
