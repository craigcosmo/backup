const env = process.env.NODE_ENV

let dbusername = 'adede'
let dbpassword = 'adede'
let dbname = 'adede'
let host = 'adede'

if (env == 'production') {
	dbusername = 'adede'
	dbpassword = 'adede'
	dbname = 'adede'
	host = 'adede'
}
export const apiUrl =
	env == 'production' ? 'https://thesite.com/' : 'http://localhost:3000/'

const allowAccessFrom = [
	'https://thesite.com',
	'http://localhost:4000',
	'https://thesite.com',
]

export { dbusername, dbpassword, dbname, host, allowAccessFrom }
