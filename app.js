/*
  index.js
  schools-api
 
  Created by Ian Thompson on Mon Jun 14 2021
  ianthompson@nicelion.com
  https://www.nicelion.com
 
  MIT Licence.
 
 */


const getDistrictsByState = require('./districts')
const getSchoolsByState = require('./schools')


const states = [ 'AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MH', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY' ];


states.forEach(state => {
  getDistrictsByState(state)
})

states.forEach(state => {
  console.log(`Now Working on ${state}`)
  getSchoolsByState(state)
})

