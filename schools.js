/*
  schools.js
  schools-api
 
  Created by Ian Thompson on Mon Jun 14 2021
  ianthompson@nicelion.com
  https://www.nicelion.com
 
  MIT Licence
 
 */


var fs = require('fs'); 
var parse = require('csv-parse');

const generateSchools = (state, callback) => {
    let schools = []

    fs.createReadStream('schools.csv')
    .pipe(parse({delimiter: ','}))
    .on('data', (row) => {

        if (row[2].trim() == state) {
            let school = {
                name: row[0].toTitleCase(),
                location: {
                    state: {
                        name: row[1],
                        abbr: row[2],
                    },
                },
    
                district: row[4].toTitleCase(),
                
                level: row[15],
    
                type: row[5],
                charterSchool: row[6],
                magnentSchool: row[7],
                locale: row[9],
    
                grades: {
                    lowest: row[13],
                    highest: row[14]
                },
                
                students: row[10],
                fte: row[11],
                pupilTeacherRatio: row[12],
                
                
            }
    
            schools.push(school)
        }


    })
    
    .on('end',function() {

        callback(schools)

    });
}

const storeData = (data, path) => {
    try {
        fs.writeFileSync(path, JSON.stringify(data, null, 3))
    } catch (err) {
        console.error(err)
    }
}
    
module.exports = getSchoolsByState = (state) => {
    generateSchools(state, schools => {
        console.log(`Writing ${state}}`)
        console.log(schools)
        storeData(schools, `schools/${state}.json`)
    
    })
}

String.prototype.toTitleCase = function() {
    var i, j, str, lowers, uppers;
    str = this.replace(/([^\W_]+[^\s-]*) */g, function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  
    // Certain minor words should be left lowercase unless 
    // they are the first or last words in the string
    lowers = ['A', 'An', 'The', 'And', 'But', 'Or', 'For', 'Nor', 'As', 'At', 
    'By', 'For', 'From', 'In', 'Into', 'Near', 'Of', 'On', 'Onto', 'To', 'With'];
    for (i = 0, j = lowers.length; i < j; i++)
      str = str.replace(new RegExp('\\s' + lowers[i] + '\\s', 'g'), 
        function(txt) {
          return txt.toLowerCase();
        });
  
    // Certain words such as initialisms or acronyms should be left uppercase
    uppers = ['Id', 'Tv', "Isd", "Usd", "Cisd", "Abc", "Cusd", "Esd", "Hsd", "Msd", "Sd", "Ccsd", "Csd", "Chsd", "Gsd", "Psd", "Ssd", "Uhsd", "Jusd"];
    for (i = 0, j = uppers.length; i < j; i++)
      str = str.replace(new RegExp('\\b' + uppers[i] + '\\b', 'g'), 
        uppers[i].toUpperCase());
  
    return str;
  }