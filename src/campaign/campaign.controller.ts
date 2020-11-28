import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateCampaignDto } from './interfaces/campaign.dto';
import { CampaignService } from './campaign.service';

@Controller('')
export class CampaignController {
  constructor(private readonly campaignService: CampaignService) {}
  @Get('api/campaigns/:id')
  async getCampaign(@Param('id') id) {
    const campaign = await this.campaignService.findOne(id);

    return {
      ok: true,
      result: {
        campaign,
      },
    };
  }

  @Post('api/campaigns')
  async create(@Body() data: CreateCampaignDto) {
    const campaign = await this.campaignService.create(data);

    return campaign;
  }

  @Put('api/campaigns/:id')
  async update(@Param('id') id, @Body() data) {
    const campaign = await this.campaignService.update(id, data);

    return campaign;
  }

  @Delete('api/campaigns/:id')
  async delete(@Param('id') id) {
    const campaign = await this.campaignService.delete(id);

    return campaign;
  }
}
