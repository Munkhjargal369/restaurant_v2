import { OnModuleInit, INestApplication } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  /*
  async enableShutdown(app: INestApplication) {
    this.$on("vesvd", async () => {
      await app.close();
    });
  }
  */
}
