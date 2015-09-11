$(document).ready(function() 
		{ 
			var galleryid2;
			var the_imgtitle;
			var the_imgdescription;
			var imageserver;
			var imagename;
			var indeximagelink2;
			var imageindexnum;
			function imageeditbox(imgtitle,imgdescription,areaid)
			{
				var imageid=areaid.replace("_",".");
				$.dialog({title:imgtitle,content: '<div> '+photo_name_tag+' : <input type="text" class="imgtitle" id="t'+areaid+'" value="'+imgtitle+'" /> <br /><br /> '+photo_description_tag+' : <br /> <textarea class="descriptionbox" id="d'+areaid+'">'+imgdescription+'</textarea> </div>',max:false,min:false,cancel:false,width: "300px",lock: true,
				button: [
					{
						name: save_description_tag,
						callback: function () {
							 $.ajax({url:"/user/managefile.php?act=descriptionimage&imageid="+imageid+"&imgtitle="
								+$("#t"+areaid).val()+"&imgdescription="+$("#d"+areaid).val(),
										async:false});
							$("#"+areaid).find("img").attr({"title":$("#t"+areaid).val(),"alt":$("#d"+areaid).val()});
							$.yoxview.update();
							cancel: true;
						},
						focus: true
					},
					{
						name: cancel_description_tag,
						callback: function () {
							cancel: true;
						}
					}]	});
			}
			$(".editimg").click(function(){
									var editimgid=$(this).parent().parent().attr("id");
									var imagetitle=$("#"+editimgid).find("img").attr("title");
									var imagedescription=$("#"+editimgid).find("img").attr("alt");
									imageeditbox(imagetitle,imagedescription,editimgid);
									
			});
			function imagecodebox(imgserver,imgname)
			{
				var f_imageurl="http://"+imgserver+".ihostimg.com/"+imgserver+"/"+imgname;
				var f_image_preurl="http://ihostimg.com/view/"+imagename+imageserver+".html";
				var bbcode='[url='+f_image_preurl+'][img]'+f_imageurl+'[/img][/url]';
				var htmlcode="<a href=\""+f_image_preurl+"\" ><img src=\""+f_imageurl+"\"  /></a>";
				$.dialog({title:youview_original_link,content: forum_code_tag+' : <input type="text" value="'+bbcode+'" class="coders" readonly="readonly" id="directlink" onclick="this.focus();this.select();" /> <br /> '+html_code_tag+' : <input type="text" value=\''+htmlcode+'\' class="coders" readonly="readonly" id="directlink" onclick="this.focus();this.select();" /> <br /> '+IM_code_tag+' : <input type="text" value="'+f_image_preurl+'" class="coders" readonly="readonly" id="directlink" onclick="this.focus();this.select();" />',max:false,min:false,cancel:false,cancelVal:cancel_description_tag,cancel: false,																																																																																																																																	 button: [{name: cancel_description_tag,
						callback: function () {
							cancel: true;}}]																																																																																																																																																																																																																																																									});
			}
			var codelink = $("<a>", {
                title: youview_original_link,
				html:youview_original_link,
				onclick : function(){
				imagecodebox(imageserver,imagename);
								} 
            });
			var editimagetag = $("<a>", {
                title: edit_tag,
				html:edit_tag,
				onclick : function(){ 
					$.yoxview.close();
					var areaid=imagename.replace(".","_")+imageserver;
					imageeditbox(the_imgtitle,the_imgdescription,areaid);
								} 
            });
			var deleteimagelink = $("<a>", {
                title: delete_image_tag,
				html: delete_image_tag,
				onclick : function(){
								if(confirm(delete_image_inform)==true)
									{
									$.ajax({url:"/user/managefile.php?act=DeleteImage&imageid="+galleryid2,async:false});
									$("#"+galleryid2.replace(".","_")).css("display", "none");
									$.yoxview.next();
									}
								}
            });
			var indexoriginalimagelink = $("<a>", {
                title: indexoriginalimagelink_tag,
				html: indexoriginalimagelink_tag,
				target: "_blank",
				onclick: function(){
					var originalimageurl="http://"+imageserver+".ihostimg.com/"+imageserver+"ihostimg/"+imagename;
					$(this).attr("href",originalimageurl);
				}
            });
			var thisimagedescription = $("<a>", {
                title: about_image_tag,
				html: about_image_tag,
				onclick : function(){
				$.dialog({title:photo_name_tag+ " : " +the_imgtitle,content: photo_description_tag+" : "+the_imgdescription,
						 max:false,min:false,cancel:false,width: "300px",cancelVal:cancel_description_tag,cancel: true});
								} 
            });
			$.yoxview.setDefaults({skin: 'top_menu'});
			$(".ipoockgalleryview").yoxview({
											"lang": user_language,"autoHideInfo":false,
											"allowInternalLinks":true,
					infoButtons: {
					download3: indexoriginalimagelink,
                    download: codelink,
					download4: thisimagedescription,
					download5: editimagetag,
					download2: deleteimagelink,
                },
					onEnd: function(){ 
						 alert(alertlastimage);
					},
				onSelect: function(imageIndex, image){ 
					imageserver=image.media.src.substr(7,2);
					imagename=image.media.src.substr(34);
					galleryid2=(imagename+imageserver).replace("/","");
		//			$.yoxview.infoButtons.download3.attr("href",indeximagelink2);
					if(!manage_jurisdiction)
						{
							$.yoxview.infoButtons.download2.css("display", "none");
							$.yoxview.infoButtons.download5.css("display", "none");
						}
					else
						{
							$.yoxview.infoButtons.download4.css("display", "none");
						}
					if(!sharecode_jurisdiction)
						$.yoxview.infoButtons.download.css("display", "none");
					the_imgtitle=image.media.title;
					the_imgdescription=image.media.alt;
    				}
				});
			$(".sharecode").click(function()
										   {
											   var imageid=$(this).parent().parent().attr("id").replace("_",".");
											   if(imageid.length==25)
											   {
												  imagename=imageid.substr(0,23);
												  imageserver=imageid.substr(23,2);
											   }
											   else
											   {
												   imagename=imageid.substr(0,24);
												   imageserver=imageid.substr(24,2);
											   }
											  imagecodebox(imageserver,imagename);
										   }
								  );
			$(".vieworiginal").click(function()
										   {
											   var imageid=$(this).parent().parent().attr("id").replace("_",".");
											   if(imageid.length==25)
											   {
												  imagename=imageid.substr(0,23);
												  imageserver=imageid.substr(23,2);
											   }
											   else
											   {
												   imagename=imageid.substr(0,24);
												   imageserver=imageid.substr(24,2);
											   }
											   var originalimageurl="http://"+imageserver+".ihostimg.com/"+imageserver+"ihostimg/"+imagename;
											   $(".mainbox").toggle();
											   $(".mainbox").after("<div class='showoriginalimagebox' onclick='$(\".showoriginalimagebox\").remove(); $(\".mainbox\").toggle();'><span style='font-size:24px;color:blue'>"+go_back_inform+"</span><br /><img src='/image/left.png' style='float:left' title='Left' /><img src='/image/right.png' style='float:right' title='Right' /><img src='"+originalimageurl+"'  /></div>");
										//	   $(this).attr("href", "/#"+$(this).parent().parent().attr("id").replace("_","."));
											    $(this).attr("target","_blank");
										   }
								  );
			$(".imageComment").click(function()
										   {
											   var areaid=$(this).parent().parent().attr("id");
											   var imageid=areaid.replace("_",".");
											   if(!comment_statue)
											   		return(alert(register_inform));
					$.dialog({title:"Comment",content: '<textarea id="c'+areaid+'" style="width:300px;height:200px;"></textarea>',max:false,min:false,cancel:false,width: "300px",okVal:save_description_tag,ok: function(){																																																					
$.ajax({url:"/user/managefile.php?act=addcomment&imageid="+imageid+"&comments="+$("#c"+areaid).val(),async:false});
    },cancelVal:cancel_description_tag,cancel: true});
										   });
});