import { Test, TestingModule } from '@nestjs/testing';
import { TimelineController } from './timeline.controller';

describe('TimelineController', () => {
  let controller: TimelineController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TimelineController],
    }).compile();

    controller = module.get<TimelineController>(TimelineController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
