#! /bin/sh

source ~/.nvm/nvm.sh
nvm use 22
echo node version $(node --version)

export ENV=test
# export ENV=development

unset TEST_DOMAIN
# export TEST_DOMAIN='http://foo.bar.com'

unset PORT
export PORT=8081

unset DEBUG
# export DEBUG='*:*'

unset LOG_LEVEL
export LOG_LEVEL=silent

./node_modules/mocha/bin/_mocha -timeout 300000 $1 