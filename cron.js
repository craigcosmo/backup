import mysqldump from 'mysqldump'
import moment from 'moment'
import tz from 'moment-timezone'
import { dbname, dbusername, dbpassword, host } from './config'
import dropboxV2Api from 'dropbox-v2-api'
import fs from 'fs'
const dropbox = dropboxV2Api.authenticate({
	token: 'iGcccccasdn2abrieirubfZ333313ciub3234m',
})

const cron = () => {
	setInterval(async function () {
		let createdDate = moment
			.tz('Asia/Ho_Chi_Minh')
			.format('D MMMM YYYY h mm ss a')
		// dump the result straight to a file
		let name = 'dump-' + createdDate + '.sql'
		try {
			let d = await mysqldump({
				connection: {
					host: host,
					user: dbusername,
					password: dbpassword,
					database: dbname,
				},
				dumpToFile: './sql/' + name,
			})
		} catch (error) {
			console.log('sql error', error)
		}

		if (d) {
			dropbox(
				{
					resource: 'files/upload',
					parameters: {
						path: '/' + name,
					},
					readStream: fs.createReadStream('./sql/' + name),
				},
				(err, result, response) => {
					console.log('err', err)
					console.log('resul', result)
					try {
						fs.unlinkSync('./sql/' + name)
					} catch (err) {
						console.error(err)
					}
				}
			)
		}
	}, 43100000) // half day day
}
export default cron
