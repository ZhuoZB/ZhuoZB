	function head(){
		//获取div下面所有的a标签（返回节点对象）
		   var myNav = document.getElementById("divurl").getElementsByTagName("a");
		   //获取当前窗口的url
		   var myURL = document.location.href;
		   //循环div下面所有的链接，
		   for(var i=0;i<myNav.length;i++){
		   //获取每一个a标签的herf属性
		  var links = myNav[i].getAttribute("id");
		  var myURL = document.location.href;
		  //查看div下的链接是否包含当前窗口，如果存在，则给其添加样式
		  if(myURL.indexOf(links) != -1){
				myNav[i].className="active m-item item m-mobile-hide";
		   }
		 }
	}
	function MandCAjax(i,type,datatype,url,data,token,T,t,web,bool,show1,show2,show3){
		$.ajax({
			type: type,
			dataType: datatype,
			url: url,
			data: data,
			beforeSend: function(request) {
			request.setRequestHeader(token,window.localStorage.getItem(token));
			},
			success: function(data) {
				var user= JSON.parse(localStorage.getItem('user'));
				var code=window.localStorage.getItem("code");
				var tpl = $(T).html()
				var template = Handlebars.compile(tpl)
				var html = template(data)
				$(t).html(html)
				if(bool==0)
					swal(show1,show2,show3);
				if(i==0){
					var id=edit("id");
					var userid="";
					if(code==3){
						$('#showemail').show();
					}
					if(id==0)
					  userid=user.id;
					else{
					  userid=id;
					  if(user.type!=0&&id!=user.id){
						  $('.delete').hide();
					  }
					}
					$("#toUserId").val(userid);
				}
				else{
					if(code==3){
						$('#uemail').show();
					}
					var user= JSON.parse(localStorage.getItem('user'));
					if(user.type!=0&&userId!=user.id)
						$('.delete').hide();
				}	
			},
			error:function(data){
				if(web==0)
					location.href="../error/404.html";
				else
					location.href="../error/500.html";
			}
		});	
	}
	
	function myAjax(type,datatype,url,data,token,T,t,web,bool,show1,show2,show3){
		$.ajax({
			type: type,
			dataType: datatype,
			url: url,
			data: data,
			beforeSend: function(request) {
			request.setRequestHeader(token,window.localStorage.getItem(token));
			},
			success: function(data) {
				var tpl = $(T).html()
				var template = Handlebars.compile(tpl)
				var html = template(data)
				$(t).html(html)
				if(bool==0)
					swal(show1,show2,show3);
			},
			error:function(data){
				if(web==0)
					location.href="../error/404.html";
				else
					location.href="../error/500.html";
			}
		});	
	}
	
	

	function chackLogin(i){
		if(i==1){
			$.ajax({
				type: "GET",
				dataType: "text",
				url:"http://81.71.4.36:18080/pictures/indexBg",
				beforeSend: function(request) {
				request.setRequestHeader("admintoken",window.localStorage.getItem("admintoken"));
				},
				success: function(data) {
					if(data.substring(2,5)=="err"){
						TGTool().info("登陆过期");
						window.localStorage.removeItem("admintoken");
						window.localStorage.removeItem("adminuser");
						window.localStorage.removeItem("admincode");
						setTimeout("location.href='adminLogin.html'",1500)
					}
				},
				error:function(data){
					location.href="../admin/adminLogin.html";
				}
			});	
		}else{
			$.ajax({
				type: "GET",
				dataType: "text",
				url:"http://81.71.4.36:18080/pictures/indexBg",
				beforeSend: function(request) {
				request.setRequestHeader("token",window.localStorage.getItem("token"));
				},
				success: function(data) {
					if(data.substring(2,5)=="err"){
						TGTool().info("登陆过期");
						window.localStorage.removeItem("token");
						window.localStorage.removeItem("user");
						window.localStorage.removeItem("code");
						setTimeout("location.href='login.html'",1500)
					}
				},
				error:function(data){
					location.href="./login.html";
				}
			});	
		}
		
	}

	function searchurl(str) {
				var LocString=String(window.document.location.href);
				 var rs=new RegExp("(^|)"+str+"=([^&]*)(&|$)","gi").exec(LocString),tmp;
				 if(tmp=rs)return tmp[2];
				 return "0";
			}
// 运行时间统计
    function secondToDate(second) {
        if (!second) {
            return 0;
        }
        var time = new Array(0, 0, 0, 0, 0);
        if (second >= 365 * 24 * 3600) {
            time[0] = parseInt(second / (365 * 24 * 3600));
            second %= 365 * 24 * 3600;
        }
        if (second >= 24 * 3600) {
            time[1] = parseInt(second / (24 * 3600));
            second %= 24 * 3600;
        }
        if (second >= 3600) {
            time[2] = parseInt(second / 3600);
            second %= 3600;
        }
        if (second >= 60) {
            time[3] = parseInt(second / 60);
            second %= 60;
        }
        if (second > 0) {
            time[4] = second;
        }
        return time;
    }
    function setTime() {
        /*此处为网站的创建时间*/
        var create_time = Math.round(new Date(Date.UTC(2020, 09, 29, 22, 46, 00)).getTime() / 1000);
        var timestamp = Math.round((new Date().getTime() + 8 * 60 * 60 * 1000) / 1000);
        currentTime = secondToDate((timestamp - create_time));
        currentTimeHtml = currentTime[0] + '年' + currentTime[1] + '天'
            + currentTime[2] + '时' + currentTime[3] + '分' + currentTime[4]
            + '秒';
        document.getElementById("htmer_time").innerHTML = currentTimeHtml;
    }
    function pages(currentPage,pages,num,typeId){
    			var pageNum="";
    			var url="";
    			var T="";
    			var t="";
    			if(currentPage==1&&num==0)
    				return false;//第一页
    			if(currentPage==pages&&num==1)
    				return false;//最后一页
    			if(num==0)
    				pageNum=currentPage-1;//上一页
    			if(num==1)
    				pageNum=currentPage+1;//下一页
    			if(typeId==0){
    				var keyWord=searchurl("keyWord");
    				url="http://127.0.0.1:18080/search?keyWord="+keyWord+"&&page=";
    				T="#mysearchT";
    				t="#mysearch";
    			}else{
    				url="http://127.0.0.1:18080/typesBlogs?typeId="+typeId+"&&currentPage=";
    				T="#typesBlogsT";
    				t="#typesBlogs";
    			}
    			$.ajax({
    				type: "GET",
    				dataType: "json",
    				url: url+pageNum,
    				beforeSend: function(request) {
    				request.setRequestHeader("token",window.localStorage.getItem("token"));
    				},
    				success: function(data) {
    					var tpl = $(T).html()
    					var template = Handlebars.compile(tpl)
    					var html = template(data)
    					$(t).html(html)
    				}
    			});	
    		}
			
function pagesHeper(currentPage,pages,num,M){
				var A="token";
				var B="admintoken";
				var key="";
				var pageNum="";
				var url="";
				var T="";
				var t="";
				if(currentPage==1&&num==0)
					return false;//第一页
				if(currentPage==pages&&num==1)
					return false;//最后一页
				if(num==0)
					pageNum=currentPage-1;//上一页
				if(num==1)
					pageNum=currentPage+1;//下一页	
				if(M=="b"){
					url="http://127.0.0.1:18080/blogs?currentPage=";
					T="#blogListT";
					t="#table-container";
					}
				if(M=="t"){
					url="http://127.0.0.1:18080/types?currentPage=";
					T="#typeListT";
					t="#typeList";
					}
				if(M=="u"){
					url="http://127.0.0.1:18080/users?currentPage=";
					T="#userListT";
					t="#userList";
					}
				if(M=="p"){
					url="http://127.0.0.1:18080/pictures?flag=1&&currentPage=";
					T="#picturesT";
					t="#pictures";
					}
				if(M=="Is"){
					url="http://127.0.0.1:18080/indexBlogs?currentPage=";	
					T="#firstPagesBlogsListT";
					t="#firstPagesBlogsList";
					}
				if(M=="It"){
					url="http://127.0.0.1:18080/typesBlogs?currentPage=";	
					T="#typesBlogsT";
					t="#typesBlogs";
					}
				if(M=="Iu"){
					url="http://127.0.0.1:18080/search?currentPage=";	
					T="#mysearchT";
					t="#mysearch";
					}
				if(M=="Ip"){
					url="http://127.0.0.1:18080/pictures?flag=1&&currentPage=";	
					T="#picturesT";
					t="#pictures";
					}
				if(M=="Ib"){
					url="http://127.0.0.1:18080/blogs?currentPage=";
					T="#blogListT";
					t="#table-container";
					}	
				if(M=="b"||M=="t"||M=="u"||M=="p")
					key=B;
				else
					key=A;		
				$.ajax({
					type: "GET",
					dataType: "json",
					url: url+pageNum,
					beforeSend: function(request) {
					request.setRequestHeader(key,window.localStorage.getItem(key));
					},
					success: function(data) {
						if(M=="Is")
							data=data[0]
						var tpl = $(T).html()
						var template = Handlebars.compile(tpl)
						var html = template(data)
						$(t).html(html)
					}
				});
			}

