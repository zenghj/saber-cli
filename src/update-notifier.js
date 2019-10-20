import updateNotifier from 'update-notifier'
import packageJson from '../package.json'

updateNotifier({pkg: packageJson}).notify();

// test update
// updateNotifier({
// 	pkg: {
// 		name: '@zenghj/saber-cli',
// 		version: '0.0.0'
// 	},
// 	updateCheckInterval: 0
// }).notify();