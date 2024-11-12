/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */

const codegen = require('./codegen');
const dotenv = require('dotenv');

dotenv.config();

codegen({
	methodName: 'backend',
	isHello: true,
	openApi: '3.0.1',
	useClassTransformer: true,
	remoteUrl: 'https://housekeeper.docduck.io/api/v3/api-docs',
	outputDir: 'src/backend',
	useStaticMethod: false
});
