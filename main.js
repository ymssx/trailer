var number=["A","2","3","4","5","6","7","8","9","10","J","Q","K","JOKER"];
var logo=["♥","♦","♣","♠","♚","♛"]
var special=["❀","✤","☠","➹","✸","❄","☯","✬","☂"]
var special_color=["#ce9aa3","green","black","blue","red","#17c0cb","black","orange","green"]
var special_price=[2000,2000,2000,2000,2000,2000,2000,2000,2000]

var card_order=0;
var my_order=[];
var enemy_order=[];
var desk_number=0;
var desk_order=[];
var click_permission=1;
var special_num=0;
var money=0;

window.onload=(function(){
	create_cards();
})

document.onkeydown=function(event)
	{ 
        var e = event || window.event || arguments.callee.caller.arguments[0]; 
        if (e && e.keyCode==13 || e && e.keyCode==32)
        {
        	play('myself');
        }
        if (e && e.keyCode==83)
        {
        	show_shop();
        }
    } 

function test(msg)
{
	window.alert(msg);
}

function create_cards()
{
	//A~K 13种数字，各4种花色
	for (var i=0;i<13;i++)
	{
		for (var j=0;j<4;j++)
		{
			var temp_card="card"+card_order;
			eval(temp_card+"=new Object()")
			eval(temp_card+".number=number[i]");
			eval(temp_card+".logo=logo[j]");
			if (j<2)
			{
				eval(temp_card+".colors=\"red\"");
			}
			else
			{
				eval(temp_card+".colors=\"black\"");
			}
			card_order++;
		}
	}
	//大王、小王
	card52=new Object();
	card53=new Object();
	card52.number="JOKER";
	card53.number="JOKER";
	card52.logo=logo[4];
	card53.logo=logo[5];
	card52.colors="red";
	card53.colors="black";
	//生成用户牌堆索引
	var random_order=[];
	for (var k=0;k<54;k++)
	{
		random_order[k]=k;
	}
	var random_order=random_order.sort(function(){return 0.5-Math.random()});
	my_order=random_order.slice(0,27);
	enemy_order=random_order.slice(27,54);
}

function card(card_order,user)
{
	if (user=="myself")
	{
		var temp_position="left:35px";
	}
	else
	{
		var temp_position="left:975px;top:35px";
	}
	if (card_order=="special")
	{
		eval("card"+(special_num+55)+"=new Object()");
		var temp_random_=Math.floor(Math.random()*9);
		eval("card"+(special_num+55)+".logo=special[temp_random_];");
		eval("card"+(special_num+55)+".colors=special_color[temp_random_];");
		eval("card"+(special_num+55)+".number='S'");
		var temp_card=eval("card"+(special_num+55));
		var div_text="<div id='desk"+desk_number+"' class='move_box' style='"+temp_position+"'><div id='card"+desk_number+"' class='face' style='color:"+temp_card.colors+"'><div class='face_number'>S</div><div class='logo' style='font-size:65px;height:95px;width:80px;'>"+temp_card.logo+"</div><div class='face_number_rotate'>S</div></div></div>";
	}
	else
	{
		var temp_card=eval("card"+card_order);
		var div_text="<div id='desk"+desk_number+"' class='move_box' style='"+temp_position+"'><div id='card"+desk_number+"' class='face' style='color:"+temp_card.colors+"'><div class='face_number'>"+temp_card.number+"</div><div class='logo'>"+temp_card.logo+"</div><div class='face_number_rotate'>"+temp_card.number+"</div></div></div>";
	}
	return div_text;
}

function play(user)
{
	if (user=="myself")
	{
		if (click_permission==1)
		{
			click_permission=0;
			if (Math.floor(Math.random()*18)==1 && desk_number!=0)
			{
				move('special',user);
			}
			else
			{
				move(my_order[0],user);
			}
		}
	}
	else
	{
		if (Math.floor(Math.random()*4)==1 && desk_number!=0)
			{
				move('special',user);
			}
			else
			{
				move(enemy_order[0],user);
			}
	}
}

function charge(card_order,user)
{
	var temp_card=eval("card"+card_order);
	var permission=1;
	if(desk_number!=1 && temp_card.number!="S")
	{
		for (var i=0;i<(desk_number-1);i++)
		{
			var temp_card2=eval("card"+desk_order[i]);
			if (temp_card.number==temp_card2.number)
			{
				for (var z=i;z<desk_number;z++)
				{
					if (user=="myself" && desk_order[z]<=54)	
					{my_order.splice(my_order.length,0,desk_order[z]);}
					if (user=="enemy" && desk_order[z]<=54)
					{enemy_order.splice(enemy_order.length,0,desk_order[z]);}
				}
				desk_order.splice(i,(desk_number-i+1));
				permission=0;
				remove(i,user);
			}
		}
	}	
	if (user=="myself" && permission==1)
	{
		play('enemy');
	}
	if (user=="enemy" && permission==1)
	{
		click_permission=1;
	}
}

function fresh_myself()
{
	document.getElementById("my_num").innerHTML=my_order.length;
}

function fresh_enemy()
{
	document.getElementById("enemy_num").innerHTML=enemy_order.length;
}
function win(user)
{
	if (user=="myself")
	{
		if (my_order.length<=0)
		{
			test("YOU LOSE!")
		}
	}
	if (user=="enemy")
	{
		if (enemy_order.length<=0)
		{
			test("YOU WIN!")
		}
	}
}
