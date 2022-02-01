$(document).ready(function(){
    $(window).on('scroll',function(){
        var scroll = $(window).scrollTop();
        
        if(scroll>=50){
            
            $(".sticky").addClass("stickyadd")
        }
        else{
            $(".sticky").removeClass("stickyadd")
        }
    })

    var typed = new Typed(".element",{
        strings: ["a Developer","a Programmer" ,"a Designer"],
        smartBackspace:true,
        typeSpeed:100,
        backSpeed:100,
        loop:true,
        loopCount: Infinity,
        startDelay:1000

    })


    //progress bar
    
    var waypoint = new Waypoint({
        element: document.getElementById('exp-id'),
        handler: function() {
            var p = document.querySelectorAll('.progress-bar');
            console.log(p);
            p[0].setAttribute("style","width:100%;transition:1s all");
            p[1].setAttribute("style","width:90%;transition:1s all");
            p[2].setAttribute("style","width:70%;transition:1s all");
            p[3].setAttribute("style","width:80%;transition:1s all");
            p[4].setAttribute("style","width:85%;transition:1s all");
            p[5].setAttribute("style","width:60%;transition:1s all");
            
        },
        offset:'90%'
      })
    

})
