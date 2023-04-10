import { configService } from 'src/config/config.service';
import { DataSource } from 'typeorm';

const dataSource = new DataSource(configService.getTypeOrmConfig());

export default dataSource;
