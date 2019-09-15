import mpg_data from "./data/mpg_data";
import {getStatistics} from "./medium_1";

/*
This section can be done by using the array prototype functions.
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
see under the methods section
*/


/**
 * This object contains data that has to do with every car in the `mpg_data` object.
 *
 *
 * @param {allCarStats.avgMpg} Average miles per gallon on the highway and in the city. keys `city` and `highway`
 *
 * @param {allCarStats.allYearStats} The result of calling `getStatistics` from medium_1.js on
 * the years the cars were made.
 *
 * @param {allCarStats.ratioHybrids} ratio of cars that are hybrids
 */
export function  getAveragempg(array){
    var highwaycount =0;
    var citycount =0;
    var citysum=0;
    var highwaysum =0;
    for (var i = 0; i < array.length; i++) {
    citysum+= array[i].city_mpg;
    highwaysum+= array[i].highway_mpg;
    highwaycount++;
    citycount++;
    }
   let city = citysum/citycount;
   let highway =highwaysum/highwaycount; 
    return {city, highway};
}

export function getallYearStats(array){
 let arr = []
 for (var i = 0; i < array.length; i++) {
     arr[i]= mpg_data[i].year;
 }
 return getStatistics(arr);
}
export function getHybridRatio(array){
var hybridcount =0;
var total =0;
var count =0;
for (var i = 0; i < array.length; i++) {
    count++;
    if( mpg_data[i].hybrid){
        hybridcount++
    }
}
    return hybridcount/count;
}
export const allCarStats = {
    avgMpg: getAveragempg(mpg_data),
    allYearStats: getallYearStats(mpg_data),
    ratioHybrids: getHybridRatio(mpg_data),
    
        
};

/**
 * HINT: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
 *
 * @param {moreStats.makerHybrids} Array of objects where keys are the `make` of the car and
 * a list of `hybrids` available (their `id` string). Don't show car makes with 0 hybrids. Sort by the number of hybrids
 * in descending order.
 *
 *[{
 *     "make": "Buick",
 *     "hybrids": [
 *       "2012 Buick Lacrosse Convenience Group",
 *       "2012 Buick Lacrosse Leather Group",
 *       "2012 Buick Lacrosse Premium I Group",
 *       "2012 Buick Lacrosse"
 *     ]
 *   },
 *{
 *     "make": "BMW",
 *     "hybrids": [
 *       "2011 BMW ActiveHybrid 750i Sedan",
 *       "2011 BMW ActiveHybrid 750Li Sedan"
 *     ]
 *}]
 *
 *
 *
 *
 * @param {moreStats.avgMpgByYearAndHybrid} Object where keys are years and each year
 * an object with keys for `hybrid` and `notHybrid`. The hybrid and notHybrid
 * should be an object with keys for `highway` and `city` average mpg.
 *
 * Only years in the data should be keys.
 *
 * {
 *     2020: {
 *         hybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         },
 *         notHybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         }
 *     },
 *     2021: {
 *         hybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         },
 *         notHybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         }
 *     },
 *
 * }
 */

export function getMakerHybrids(){
    var result = mpg_data.reduce(function(acc, value){
        if (acc.findIndex(elem => elem.make === value.make)==-1){
            let hybrids = mpg_data.filter(item => item.make === value.make).filter(item => item.hybrid).map(item => item.id)
            if (hybrids.length >0){
                acc.push({make: value.make, hybrids});
            }
            }
            return acc;
        },[]);
        return result;
}
export function getMpgbyYearAndHybrid(){
    let year= mpg_data.map(elem => elem.year);
    let object = {};
    let hybrid =mpg_data.filter(elem => elem.hybrid === true);
    let reg =mpg_data.filter( elem => elem.hybrid ===false);
    for(let i=0; i<year.length; i++){
        let years = year[i];
        let obj ={hybrid: getAveragempg(hybrid.filter(elem => elem.year == years)),
            notHybrid: getAveragempg(reg.filter(elem => elem.year ==years))
        }
            object[years] =obj;

    };
    return object;
}
export const moreStats = {
    makerHybrids: getMakerHybrids(),
    avgMpgByYearAndHybrid: getMpgbyYearAndHybrid()
};
