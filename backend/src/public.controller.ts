import { Body, Controller, Post } from '@nestjs/common';
import { AllowAnonymous } from '@thallesp/nestjs-better-auth';
import { prisma } from '../auth.js';

@Controller()
export class PublicController {
  @Post('registrations')
  @AllowAnonymous()
  async createRegistration(@Body() body: Record<string, unknown>) {
    return prisma.playerRegistration.create({
      data: {
        fullName: String(body.fullName ?? ''),
        dateOfBirth: new Date(String(body.dateOfBirth)),
        age: String(body.age ?? ''),
        gender: String(body.gender ?? ''),
        category: String(body.category ?? ''),
        playerPhone: body.playerPhone ? String(body.playerPhone) : null,
        parentName: String(body.parentName ?? ''),
        parentPhone: String(body.parentPhone ?? ''),
        occupation: body.occupation ? String(body.occupation) : null,
        address: String(body.address ?? ''),
        healthStatus: body.healthStatus ? String(body.healthStatus) : null,
        indemnityName: body.indemnityName ? String(body.indemnityName) : null,
        attestationName: body.attestationName ? String(body.attestationName) : null,
        indemnityAccepted: body.indemnityAccepted === true || body.indemnityAccepted === 'true',
        attestationAccepted: body.attestationAccepted === true || body.attestationAccepted === 'true',
        signature: body.signature ? String(body.signature) : null,
        signatureDate: body.signatureDate ? new Date(String(body.signatureDate)) : null,
      },
    });
  }

  @Post('contacts')
  @AllowAnonymous()
  async createContactMessage(@Body() body: Record<string, unknown>) {
    return prisma.contactMessage.create({
      data: {
        name: String(body.name ?? ''),
        email: String(body.email ?? ''),
        subject: String(body.subject ?? ''),
        message: String(body.message ?? ''),
      },
    });
  }
}
