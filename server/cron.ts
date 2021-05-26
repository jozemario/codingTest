import * as cron from 'node-cron'
import moment from 'moment';


cron.schedule('* * * * *', () => {
  console.log('running a task every minute');
}//,
//{ scheduled: true, timezone: 'America/Costa_Rica'}
);

