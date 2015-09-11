$(document).ready(function() 
{
	var isableimageclick=1;
	var manageimagearry="";
	$(".vieworiginal").text(original_tag);
	$(".sharecode").text(share_image_tag);
	$(".editimg").text(edit_tag);
	$(".deleteimage").text(delete_tag);
	$(".imageComment").text(comment_tag);
	$(".exportimagesharecode").text(share_image_tag);
	$("input:checkbox").attr( "checked" ,false);
	
	function getbbcode(imageserver,imagename)
	{
		var f_imageurl="http://"+imageserver+".ihostimg.com/"+imageserver+"/"+imagename;
		var f_image_preurl="http://ihostimg.com/view/"+imagename+imageserver+".html";
		return bbcode='[url='+f_image_preurl+'][img]'+f_imageurl+'[/img][/url]';
	}
	function gethtmlcode(imageserver,imagename)
	{
		var f_imageurl="http://"+imageserver+".ihostimg.com/"+imageserver+"/"+imagename;
		var f_image_preurl="http://ihostimg.com/view/"+imagename+imageserver+".html";
		return htmlcode="<a href=\""+f_image_preurl+"\" ><img src=\""+f_imageurl+"\"  /></a>";
	}
	
	if(!$(":selected").attr("id")) //user just one gallery
		{
			$(".moveeselectimage").css("display","none")
		}
	$(".selectallimage").click(function(){
										$("li img").css("border","3px solid red");
										$("input:checkbox").attr( "checked" , true);
										$("#allbbcode").val(selectallimagebbcode.replace(/bkbk@/g,"\n\n"));
										$("#allhtmlcode").val(selectallimagehtmlcode.replace(/bkbk@/g,"\n\n"));
										});
	$(".unselectallimage").click(function(){
										$("li img").css("border","");
										$("input:checkbox").attr( "checked" , false);
										$("#allbbcode").val("");
										$("#allhtmlcode").val("");
										});
	$(".exportimagesharecode").click(function()
							{
								$("#allcodebox").css("display","inline");
							});
	$(".cancledmanageimagebox").click(function()
							{
								isableimageclick=1;
								$(".multiplemanagebox").css("display", "none");
								$(".imagecheckbox").css("display", "none");
								$("#allcodebox").css("display", "none");
								$("li img").css("border","");
								$(":checked").attr("checked",false);
							});
	$(".deleteselectimage").click(function()
							{
								var selector=0;
								manageimagearry="";
								while($(":checked:eq("+selector+")").parent().parent().attr("id"))
									{
										manageimagearry+=$(":checked:eq("+selector+")").parent().parent().attr("id").replace("_",".")+"|";
										selector++;
									}
								if(!manageimagearry)
									{
										alert(conform_unselect_image);
										return;
									}
								if(confirm(delete_image_inform)==true)
									{
										manageimagearry=manageimagearry.replace("_",".");
										$.ajax({url:"/user/managefile.php?act=multipledeleteimage&imageids="+manageimagearry,async:false});
										location.reload();
									}
								else
									{
										manageimagearry="";
									}
							});
	$(".moveeselectimage").click(function()
							{
								var selector=0;
								manageimagearry="";
								while($(":checked:eq("+selector+")").parent().parent().attr("id"))
									{
										manageimagearry+=$(":checked:eq("+selector+")").parent().parent().attr("id").replace("_",".")+"|";
										selector++;
									}
								if(!manageimagearry)
									{
										alert(conform_unselect_image);
										return;
									}
								$.dialog({title:"Move",content: move_image_tag+' :　'+$(".gallerylist").html(),max:false,min:false,cancel:false,width: "300px",lock: true,
				button: [
					{
						name: save_description_tag,
						callback: function () {
							$.ajax({url:"/user/managefile.php?act=moveimagetogallery&imageids="
								   +manageimagearry+"&galleryid="+$(":selected").attr("id"),async:false});
							location.reload();
						},
						focus: true
					},
					{
						name: cancel_description_tag,
						callback: function () {
							manageimagearry="";
							cancel: true;
						}
					}]	});
							});
	$(".imagecheckbox").click(function(){
		
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
											bbcode=getbbcode(imageserver,imagename);
											htmlcode=gethtmlcode(imageserver,imagename);
											
									   if($(this).attr("checked")==true)
									   {
										   	$("#allbbcode").val($("#allbbcode").val()+bbcode);
											$("#allhtmlcode").val($("#allhtmlcode").val()+htmlcode);
										   
										   $(this).parent().parent().find("img").css("border","3px solid red");
									   }
									   else
									   {
										   $("#allbbcode").val($("#allbbcode").val().replace(bbcode,""));
										   $("#allhtmlcode").val($("#allhtmlcode").val().replace(htmlcode,""));

										    $(this).parent().parent().find("img").css("border","");
									   }
									   });
	$(".multiplemanage").click(function()
						{
							isableimageclick=0;
							$(".selectallimage").text(select_all_image_tag);
							$(".unselectallimage").text(unselect_all_image_tag);
							$(".operationremind").text(choose_action);
							$(".deleteselectimage").text(delete_tag);
							$(".moveeselectimage").text(moveimage_tag);
							$(".cancledmanageimagebox").text(cancel_description_tag);
							$(".multiplemanagebox").css("display", "block");
							$(".imagecheckbox").css("display", "block");
						});
	$("ul li img").click(function()
										   {
											if(isableimageclick)
											   return true;
											else
											{
												/*get current image code*/
												var imageid=$(this).parent().parent().parent().attr("id").replace("_",".");
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
											
												bbcode=getbbcode(imageserver,imagename);
												htmlcode=gethtmlcode(imageserver,imagename);
												/*get current image code*/
												
											if($(this).parent().parent().find("input:checkbox").attr("checked")==true) //unselect
											{
												$("#allbbcode").val($("#allbbcode").val().replace(bbcode,""));
												$("#allhtmlcode").val($("#allhtmlcode").val().replace(htmlcode,""));
												
												$(this).css("border","");
												$(this).parent().parent().find("input:checkbox").attr("checked",false);	
											}
											else  //select image
											{
												
											$("#allbbcode").val($("#allbbcode").val()+bbcode);
											$("#allhtmlcode").val($("#allhtmlcode").val()+htmlcode);
											
											$(this).css("border","3px solid red");
										    $(this).parent().parent().find("input:checkbox").attr("checked",true);	
											}
											return false;
											}
										   }
								  );

});