const query = require('../db')

const dynamicDao = {

     newDynamic(dynamic) {
          console.log(dynamic)
          return query(`insert into nynamic(article,picture,view_count,like_count) values(${dynamic.article},${dynamic.picture},${dynamic.view_count},${dynamic.like_count});`)
     },

     getAll(page) {

          const num = (page - 1) * 6
          return query(`select * from nynamic limit 0,6`)
     },
     getCount() {
          return query('SELECT COUNT(*) FROM NYNAMIC')
     }
}

module.exports = dynamicDao
