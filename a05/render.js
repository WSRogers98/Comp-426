/**
 * Course: COMP 426
 * Assignment: a05
 * Author: <type your name here>
 *
 * This script uses jQuery to build an HTML page with content taken from the
 * data defined in data.js.
 */



/**
 * Given a hero object (see data.js), this function generates a "card" showing
 *     the hero's name, information, and colors.
 * @param hero  A hero object (see data.js)
 */
export const renderHeroCard = function(hero) {
    // TODO: Copy your code from a04 to render the hero card
    // TODO: Generate HTML elements to represent the hero
    // TODO: Return these elements as a string, HTMLElement, or jQuery object
    // Example: return `<div>${hero.name}</div>`;
   return `
   <div id="${hero.id}" class="heroes" style = "color:${hero.color}; background-color:${hero.backgroundColor};">
    <img class="image" src="${hero.img}">
    <h1 class="heroname">Hero Name: ${hero.name}</h1>
    <h2 class="name">Normie Name: ${hero.first} ${hero.last}</h2>
    <p class="description"> Descritpion: ${hero.description}<p>
    <span class="first sceen"> First Comic: ${hero.firstSeen}<span>
    <button type ="button" class ="button" style = "border-color: transparent; background-color: ${hero.color}; color:${hero.backgroundColor};">Edit</Button>
   </div>
   `;
};



/**
 * Given a hero object, this function generates a <form> which allows the
 *     user to edit the fields of the hero. The form inputs should be
 *     pre-populated with the initial values of the hero.
 * @param hero  The hero object to edit (see data.js)
 */
export const renderHeroEditForm = function(hero) {
    // TODO: Copy your code from a04 to render the hero edit form
     // TODO: Generate HTML elements to represent the hero edit form
    // TODO: Return these elements as a string, HTMLElement, or jQuery object
    // Example: return `<form>${hero.name}</form>`;
    return `<form id="form">
    <label class="label">Name</label>
    <input name= name type="text"value ="${hero.name}">
       </input>
      
    <label class="label">First Name</label>
    <input name=first type="text" value="${hero.first}">
       </input>
     
    <label class="label">Last Name</label>
    <input name=last type="text"value ="${hero.last}">
       </input>

    <label class="label">Description</label>
 <textarea name="description">${hero.description}</textarea>

    <label class="label">First Seen</label>
    <input type="text" value ="${hero.firstSeen}" name="firstSeen">
       </input>
     
    <label class="label">Last Seen</label>
       <button id="${hero.id}" class ="cancel" style = "border-color: transparent; background-color: ${hero.color}; color:${hero.backgroundColor};">Cancel </Button>
    <button type ="submit" class ="button" style = "border-color: transparent; background-color: ${hero.color}; color:${hero.backgroundColor};">Save </Button>  
   <p id ="workaround">${hero.id}</p>
   <p>Shoutout to the TAs for literally teaching me all of this. Ya'll are great</p>

    </form>`
};
// <input type="date"value ="${hero.lastSeen}">
// </input>


/**
 * Handles the JavaScript event representing a user clicking on the "edit"
 *     button for a particular hero.
 * @param event  The JavaScript event that is being handled
 */
export const handleEditButtonPress = function(event) {
    // TODO: Render the hero edit form for the clicked hero and replace the
    //       hero's card in the \DOM with their edit form instead
    const $root = $('#root');
       let hero = heroicData.filter( a => a.id == event.id)[0];
        $(`#${hero.id}`).remove();
        $root.append(renderHeroEditForm(hero));
};



/**
 * Handles the JavaScript event representing a user clicking on the "cancel"
 *     button for a particular hero.
 * @param event  The JavaScript event that is being handled
 */
export const handleCancelButtonPress = function(event) {
    // TODO: Render the hero card for the clicked hero and replace the
    //       hero's edit form in the DOM with their card instead
     const $root = $('#root');
    let thisHero= heroicData.filter(a => a.id == event.id)[0];
    $(`#form`).remove();
    $root.append(renderHeroCard(thisHero));
     // why tf did this not work Thanks TA
 //let thisHero = $(event.target).parent().attr("id");
 //let rep = heroicData.find(a => a.id == thisHero);
 //let form = renderHeroCard(rep);
 //$(event.target).parent().replaceWith(form);
};



/**
 * Handles the JavaScript event representing a user clicking on the "cancel"
 *     button for a particular hero.
 * @param event  The JavaScript event that is being handled
 */
export const handleEditFormSubmit = function(event) {
    // TODO: Render the hero card using the updated field values from the
    //       submitted form and replace the hero's edit form in the DOM with
    //       their updated card instead
    const $root = $('#root');
    var thisHero;
    let thisId= parseInt(document.getElementById('workaround').innerHTML);
    let form = $('#form').serializeArray();
    // *meme* is this a javascript date object?
    var weirdDate = new Date(form[4].value)
    weirdDate = new Date(weirdDate.getFullYear(), weirdDate.getMonth())
    heroicData.forEach( a => {
        if(a.id == thisId){
            a.name =form[0].value;
            a.first =form[1].value;
            a.last =form[2].value;
            a.description =form[3].value;
             a.firstSeen =weirdDate;
            thisHero = a;
        }
    });
    $('#form').remove();
    $root.append(renderHeroCard(thisHero))
};



/**
 * Given an array of hero objects, this function converts the data into HTML,
 *     loads it into the DOM, and adds event handlers.
 * @param  heroes  An array of hero objects to load (see data.js)
 */
export const loadHeroesIntoDOM = function(heroes) {
    // Grab a jQuery reference to the root HTML element
    let thishero = '';
    const $root = $('#root');

    // TODO: Generate the heroes using renderHeroCard()
    //       NOTE: Copy your code from a04 for this part
    heroes.forEach(h => {
        thishero += renderHeroCard(h);
    });
    // TODO: Append the hero cards to the $root element
    //       NOTE: Copy your code from a04 for this part
    $root.html(thishero);


// Not Sure what to do here. it works perfectly fine using the "Use jQuery to execute the loadHeroesIntoDOM function after the page loads"
    // TODO: Use jQuery to add handleEditButtonPress() as an event handler for
    //       clicking the edit button
    // TODO: Use jQuery to add handleEditFormSubmit() as an event handler for
    //       submitting the form
    // TODO: Use jQuery to add handleCancelButtonPress() as an event handler for
    //       clicking the cancel button

};



/**
 * Use jQuery to execute the loadHeroesIntoDOM function after the page loads
 */
$(function() {
    loadHeroesIntoDOM(heroicData);
    $(document).on('click', '.cancel', function(){
        handleCancelButtonPress(this);
    });
    $(document).on('submit', '#form', function(){
       handleEditFormSubmit(this)     
    });
    $(document).on('click', '.heroes', function(){  
        handleEditButtonPress(this)
    });
});
// sorry for the submission spam I am just testing some functionalilty to prepare for the final project
