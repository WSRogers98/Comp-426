

// why did i have to make this? because the scope of event was being weird
let edittemp=0;
let replytemp=0;
let retweettemp=0;

export async function likeTweet(event){
  event.preventDefault();
    let thisurl="https://comp426fa19.cs.unc.edu/a09/tweets/" +event.target.value+"/like";
    const result = await axios({
        method: 'put',
        url: thisurl,
        withCredentials: true,
      });
      $('#tweetcontainer').replaceWith(load());
      return result;
};

export async function unlikeTweet(event){
  event.preventDefault();
  let thisurl="https://comp426fa19.cs.unc.edu/a09/tweets/" +event.target.value+"/unlike"; 
    const result = await axios({
        method: 'put',
        url: thisurl,
        withCredentials: true,
      });
      $('#tweetcontainer').replaceWith(load());
      return result;
};

export async function retweet(event){
  event.preventDefault()
  let thisretweet="" + $("textarea[id=retweeteditor").val() + "";
  var body =document.getElementById(retweettemp)
    const result = await axios({
        method: 'post',
        url: 'https://comp426fa19.cs.unc.edu/a09/tweets',
        withCredentials: true,
        data: {
          "type": "retweet",
          "parent":retweettemp,
          "body": thisretweet+"<br>" +" Retweet from: "+body.innerHTML
        },
      });
       $('#tweetcontainer').replaceWith(load());
      return result;
};

export async function reply(event){
  event.preventDefault();
  let thisreply="" + $("textarea[id=replyeditor").val() + "";
    const result = await axios({
        method: 'post',
        url: 'https://comp426fa19.cs.unc.edu/a09/tweets',
        withCredentials: true,
        data: {
          "type": "reply",
          "parent": replytemp,
          "body": thisreply
        },
      });
      $('#tweetcontainer').replaceWith(load());
      return result;
};
export function replyedit(event){
  const $root = $('#root');
  let thisreply=`<form  value="${event.target.value}" class="form3"><textarea id="replyeditor" rows="10" cols="35">Type Here.</textarea><br><button value="${event.target.value}" class="submit" type="submit">Submit</button></form>`
  $('#replysection-'+event.target.value).replaceWith(thisreply);
  replytemp=event.target.value
  $root.on("submit",".form3",reply);
}
export async function editTweet(event){
  event.preventDefault();
  let test="" + $("textarea[id=editor]").val() + "";
  let thisurl="https://comp426fa19.cs.unc.edu/a09/tweets/" +edittemp;
  const result = await axios({
      method: 'put',
      url: thisurl,
      withCredentials: true,
      data: {
        "type": "tweet",
        "body": test,
      },
    });
     $('#tweetcontainer').replaceWith(load());
    return result;
};

export async function destroy(event){
    event.preventDefault();
    let thisurl="https://comp426fa19.cs.unc.edu/a09/tweets/" +event.target.value;
const result = await axios({
  method: 'delete',
  url: thisurl,
  withCredentials: true,
});
 $('#tweetcontainer').replaceWith(load());
return result;
};

export async function getTweets(){
const result = await axios({
    method: 'get',
    url: 'https://comp426fa19.cs.unc.edu/a09/tweets',
    withCredentials: true,
  });
  return result;
};
export async function postTweet(event){
    event.preventDefault();
const result = await axios({
    method: 'post',
    url: 'https://comp426fa19.cs.unc.edu/a09/tweets',
    withCredentials: true,
    data: {
        "type": "tweet",
      "body": $("textarea[id=sub]").val(),
    },
  });
  let ui=``
  ui+=`<div id="postsection"><h2>Post a Tweet!</h2><button class="post"type="button">Create New Tweet</button></div>`
  $('#tweetcontainer').replaceWith(load());
  $('#postsection').replaceWith(ui);
  return result;
};

export function postTweeteditor(){
  const $root = $('#root');
  let uiedit=``
   uiedit+=`<div id="postsection"><h2>Post a Tweet!</h2><form class="form"><textarea id="sub" name="upload" rows="10" cols="35">Type Here.</textarea><br><button class="submit" type="submit">Submit</button></form><br></div>`
   $('#postsection').replaceWith(uiedit);
   $root.on("submit",".form",postTweet)
}

export function uploadUI(){
    const $root = $('#root');
    $root.html('');
    let ui=``
   //<form class="form"><textarea id="sub" name="upload" rows="10" cols="35">Type Here.</textarea><br><button class="submit" type="submit">Submit</button></form><br>`
   ui+=`<div id="postsection"><h2>Post a Tweet!</h2><button class="post"type="button">Create New Tweet</button></div>`
    $root.append(ui);
    $root.on("submit",".form",postTweet)
    load();

}

export function createEdit(event){
  const $root = $('#root');
  var body1 =document.getElementById(event.target.value)
  let thisedit=`<form  value="${event.target.value}" class="form2"><textarea id="editor" rows="10" cols="35">Type Here.</textarea><br><button value="${event.target.value}" class="submit" type="submit">Submit</button></form>`
  $('#editsection-'+event.target.value).replaceWith(thisedit);
  edittemp=event.target.value
  $root.on("submit",".form2",editTweet);
  
}
export function createretweet(event){
  const $root = $('#root');
  let thisedit=`<form  value="${event.target.value}" class="form3"><textarea id="retweeteditor" rows="10" cols="35">Type Here.</textarea><br><button value="${event.target.value}" class="submit" type="submit">Submit</button></form>`
  $('#retweetsection-'+event.target.value).replaceWith(thisedit);
  retweettemp=event.target.value
  $root.on("submit",".form3",retweet);
  
}
export function load(){
    const $root = $('#root');
    let tweets=``
    const loadinfo = async function(){
        let info = await getTweets();
        tweets+=`<div id=tweetcontainer>`
    for(let i =0; i<50; i++){
        tweets += (`<div class="tweet" id="${info.data[i].id}"><h1>${info.data[i].author}<h1/><p>${info.data[i].body}</p></div><p>Likes:${info.data[i].likeCount}</p><p>Retweets:${info.data[i].retweetCount}</p><p>Replies:${info.data[i].replyCount}</p>`);
        if(info.data[i].isMine==true){
        
            tweets+=(`<div id="editsection-${info.data[i].id}"><button class="edit" value=${info.data[i].id} type="button">Edit</button></div>`);
            tweets+=(`<div id="replysection-${info.data[i].id}"><button class="reply" value="${info.data[i].id}"  type="button">Reply</button></div>`);
            tweets+=(`<button class= "delete2" value="${info.data[i].id}" type="button">Delete</button> <br>`);
            tweets+=(`<div id="retweetsection-${info.data[i].id}"><button class="retweet" value="${info.data[i].id}"  type="button">Retweet</button></div> <br>`);
            tweets+=(`<br>`);
            

        }else{
          if(info.data[i].isLiked==true){
            tweets+=(`<button class="Unlike" value="${info.data[i].id}" type="button">UnLike</button>`);
          }else{
            tweets+=(`<button class="like" value="${info.data[i].id}" type="button">Like</button>`);
          }
            tweets+=(`<div id="replysection-${info.data[i].id}"><button class="reply" value="${info.data[i].id}" type="button">Reply</button></div>`);
            tweets+=(`<div id="retweetsection-${info.data[i].id}"><button class="retweet" value="${info.data[i].id}"  type="button">Retweet</button></div> <br>`);
            tweets+=(`<br>`);
        }
    }
    tweets+=`</div>`
    $root.off('click').on("click",".delete2",function(){
      destroy(event)
    });
    $root.on("click",".retweet",createretweet)
    $root.on("click",".edit",createEdit)
    $root.on("click",".post",postTweeteditor)
    $root.on("click",".like",likeTweet)
    $root.on("click",".reply",replyedit)
    $root.on("click",".Unlike",unlikeTweet)
    $root.append(tweets);
    }
    loadinfo()
}
$(function(){
uploadUI();
});