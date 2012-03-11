//JK Popup Window Script (version 3.0)- By JavaScript Kit (http://www.javascriptkit.com)
//Visit JavaScriptKit.com for free JavaScripts
//This notice must stay intact for legal use
function openpopup(popurl,type)
{
	var windowSpecs = "width=820,height=630,resizable";
	var windowName = "_blank";
	
	switch(type)
	{
		case 'challenge_popup':
			windowSpecs = "width=600,height=400,resizable=no,scrollbars=no,status=no,toolbar=no";
			windowName = "_blank";
		case '4':
			windowSpecs = "width=954,height=704,resizable";
			windowName = "challenge_popup";
			break;
		case '1':
		case '15':
		case '1-5':
		case '2':
		case '3':
		default:
			windowSpecs = "width=820,height=630,resizable";
			windowName = "_blank";
			break;
	}
	
	var winpops=window.open(popurl,windowName,windowSpecs)
}

function autoExpandHeight(selector){
	var startHeight = $(selector).height();
	$(selector).css( "height", "auto" );
	var endHeight = $(selector).height();
	$(selector).height( startHeight ).animate({ height: endHeight },null,null, function(){
					$(selector).css('height', 'auto');
			});	
}

function switchChallenge(i){
	if(i==0){
		$('#backChallenge').css("visibility", "hidden");
	}else{
		$('#backChallenge').css("visibility", "visible");
	}
	if(i==$(".challenge").length-1){
		$('#forwardChallenge').css("visibility", "hidden");
	}else{
		$('#forwardChallenge').css("visibility", "visible");
	}
	$(".challenge").attr('class', 'challenge');
	$($(".challenge")[i]).attr('class', 'challenge selected');
	$('#currentChallenge').animate({'height' : "0px"}, null, null, function(){
			$('#currentChallenge').html(challenges[i]);															  
			autoExpandHeight('#currentChallenge');
		});
}


var shimmer;
var compete = false;
var intervalID;
function createIframe(x, y, width, height, name){
	if(!name){name = "shimmer";}
	
    var shimmer = document.createElement('iframe');
	shimmer.id=name;
	shimmer.style.position='absolute';
	shimmer.style.width=width+'px';
	shimmer.style.height=height+'px';
	shimmer.style.top=y+'px';
	shimmer.style.left=x+'px';
	shimmer.style.zIndex='999';
	shimmer.setAttribute('frameborder','0');
	shimmer.setAttribute('src','javascript:false;');
	document.body.appendChild(shimmer);
	if(navigator.userAgent.indexOf('Mac') != -1){
		if(compete){
			intervalID = setInterval(function(){
				if(shimmer.style.height == height+'px'){
					shimmer.style.height = (height+1)+'px';
				}else{
					shimmer.style.height = height+'px';
				}
			}, 1);
		}else{
			$('applet').css("visibility", "hidden");
		}
	}
}

function removeIframe(name){
	if(!name){name = "shimmer";}
	var shimmer = document.getElementById(name);
	if(navigator.userAgent.indexOf('Mac') != -1){
		if(compete){
			clearInterval(intervalID);
		}else{
			$('applet').css("visibility", "visible");
		}
	}
	document.body.removeChild(shimmer);
	
}

//also change css of style.css
var iframeShim = true;

$(document).ready(function(){
		
	$('#navHeader').click(function() {
		 var elem =  $('#navDiv');
		 if (elem.is(":hidden")) {
			$('#navArrow').attr('src', 'images/downArrow.png');
			if(iframeShim){
				elem.css('display', 'block');
				elem.css('z-index', '1000');
				var offset = elem.offset();
				var width = elem.width();
				var height = elem.height();
				elem.css('display', 'none');
				createIframe(offset.left, offset.top, width, height);
			}else{
				$('#applet').animate({'margin-top': "202px"});
			}
			elem.slideDown();	
		 }else{
			$('#navArrow').attr('src', 'images/rightArrow.png');
			elem.slideUp();
			if(iframeShim){
				$('#shimmer').slideUp(400, function(){
					removeIframe();									
				})
			}else{
				$('#applet').animate({'margin-top': "0px"});
			}
		 }
	});
	$('#navHeader').click();
	//if in applets////////////////////
	/////////////////////////////////////
	$('#expander').click(function() {
		 var elem =  $('#projBar');
		 if (elem.is(":hidden")) {
			$('#expander img').attr('src', 'images/collapse.png');
			$('#expander').animate({'margin-left': '194px'});
			elem.css('display', 'block');	
			elem.animate({'width' : '206px'});
		 }else{
			$('#expander img').attr('src', 'images/expand.png');
			$('#expander').animate({'margin-left': '-11px'});
			elem.animate({'width' : '0px'}, null, null, function(){
							elem.css('display', 'none');							   
						});
		 }
	});
	

	var roots = ['#description', '#challenge', '#resource'];
	function focusSideBar(target){
		for(var noti in roots){
			if($(roots[noti]+"Link")[0] !== target){
				$(roots[noti]+"Block").animate({'height' : '0px'}, null, null, function(){
					$(this).css('display', 'none');							   
				});
				$(roots[noti]+"Arrow").attr('src', 'images/blueRightArrow.png');
			}else{
				$(roots[noti]+"Arrow").attr('src', 'images/blueDownArrow.png');
				$(roots[noti]+"Block").css('display', 'block');
				autoExpandHeight(roots[noti]+"Block");
			}
		}
	}
	
	
	//This handles opening and closing the subsections of the sidebar and switching out arrows
	for(var i in roots){
		$(roots[i]+"Link").click(function(evt){
			if($(evt.currentTarget).next().css('display') == "none"){
				focusSideBar(evt.currentTarget);
			}else{
				$(evt.currentTarget).next().animate({'height' : '0px'}, null, null, function(){
					$(this).css('display', 'none');							   
				});
				$(evt.currentTarget).find('img').attr('src', 'images/blueRightArrow.png');
			}
		});
	}
	
	
	if($('#descriptionBlock').length>0){
		focusSideBar($('#descriptionLink')[0]);
	}
	/*$('#descriptionLink').click(function(){
			$('#appChallenges').animate({'height' : '0px'}, null, null, function(){
				$('#appChallenges').css('display', 'none');							   
			});
			
			resetArrows();
			$('#descriptionArrow').attr('src', '/images/blueDownArrow.png');

			
			$('#appDescription').css('display', 'block');
			autoExpandHeight('#appDescription');
										 
	});
	
	
	$('#challengeLink').click(function(){
			$('#appDescription').animate({'height' : '0px'}, null, null, function(){
				$('#appDescription').css('display', 'none');							   
			});
			$('#challengeArrow').attr('src', '/images/blueDownArrow.png');
			$('#descriptionArrow').attr('src', '/images/blueRightArrow.png');
			
			$('#appChallenges').css('display', 'block');
			autoExpandHeight('#appChallenges');
									 
	});*/
	
	$(".challenge").click(function(evt){
		var elem = $(evt.target);
		var num = parseInt(elem.html())-1;
		currentChoice = num;
		switchChallenge(num);
	});
	
	$('#backChallenge').click(function(){
			if(currentChoice != 0){
				currentChoice--;
				switchChallenge(currentChoice);
			}					   
		});
	$('#forwardChallenge').click(function(){
		if(currentChoice != $(".challenge").length-1){
			currentChoice++;
			switchChallenge(currentChoice);
		}					   
	});
	
	$('#projContent').css('minHeight', ($('#applet').height()-10-$('#windmills').height())+"px");
	
	//////////////////////////////////
	
	//Navigation IFrame Fix so element shows up over java applet


});