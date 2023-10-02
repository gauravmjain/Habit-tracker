$('.calendar #show-dates').click((e)=>{
    e.preventDefault();
    let  id = $(e.target).parent().parent().attr('id'); 
    calendar(id);
    
})


$(document).ready(function() {
  $(document).on('click', '#hide-dates', async function(e) {
        e.preventDefault();
        let  id = $(e.target).parent().parent().attr('id');
        await hideDates(id,e);
   
  });
  $(document).on('click', '#show-dates', async function(e) {
    e.preventDefault();
    let  id = $(e.target).parent().parent().attr('id'); 
    await calendar(id);
});
});


let getEventArray = async (id) => {
    let arr =  await donesArray(id);
    function updarteCalender(done,notDone){
        let dones = done.map (function(date){
            return{
                title : 'Done',
                start : date,
                backgroundColor : 'green',
            };
        })
        let notDones = notDone.map(function(date){
            return {
                title : "Not Done",
                start : date,
                backgroundColor : 'red'
            }
        })
        return dones.concat(notDones);
    } 
    return updarteCalender(arr.done,arr.notDone);
    
}



let calendar = async function(id){	
    let eventArray = await getEventArray(id);
    // console.log(eventArray);

    // calender element

    var calendarEl = document.getElementById(id);
    var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridWeek',
        height : 170 ,
        events : eventArray ,
        dateClick:async function(info) {
            // Handle click on the date here
            await clickHandle(info,id,calendar); 
        },
        
    });
    $(`#${id}`).html('<a href="/habit/hide_dates" id = hide-dates> <i class="fa-solid fa-caret-up"></i> </a>');
    await calendar.render(); 
}


let clickHandle = async function(info,postId,calendar){
    let dateClicked = new Date (info.dateStr);  
    let createdDate = $('#created-at').html();
    let startDate = new Date(createdDate);
    let endDate = new Date();
    // console.log(info.dateStr)

    // if we want user to not mark habit before creating it we also can add dateClicked >= startDate into our if condition

    if(dateClicked <= endDate){        
        await $.ajax({
            type : 'POST',
            url : '/habit/done',
            data : {
                add : JSON.stringify(dateClicked),
                postId : postId
            },
            success : function (response) {
            },
            error : (err)=>{
                console.log("errr",err);
            }
        })        
    }     
    let events = await getEventArray(postId);
    await calendar.removeAllEvents();
    await calendar.addEventSource(events);
    // console.log(events)   
}

let donesArray = async function (habitId){
    let habits = null;
    await $.ajax({
        type : 'GET',
        url : '/habit/render-dones',
        data : {
            id : habitId
        },
        success : (response) => {
            let dones = response.data.arr;
            habits = {
                done : dones.dones,
                notDone : dones.notdones
            };
        },
        error : (err)=>{
            console.log("errr",err);
        }
    })
    return habits;
}


let hideDates = async function (id,e){
    $.ajax({
        url : "/habit/hide_dates",
        type : 'GET',
        data : {} ,
        success : (response) =>{
            let parentDiv = $(`#${id}`).parent();
            $(`#${id}`).remove();
            let appendData = hideDateData(id);
            parentDiv.append(appendData)            
        },
        error : (err)=>{
            console.log(err);
        }
    })
    return false;
}

let hideDateData = (id) =>{
    return $(`
        <div id = ${id} class = 'calendar'>
            <a href="/habit/show_dates" id = show-dates> <i class="fa-solid fa-caret-down"></i> </a>     
        </div>
    `)
}