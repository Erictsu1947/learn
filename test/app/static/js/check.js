function setTxt(id) 
{ 
	document.getElementById(id).select();
	var content=document.getElementById(id).value;
    window.clipboardData.setData('text',content);
} 
function reporteranbuse(imageid)
				{
					$.ajax({url:"/user/managefile.php?act=reporteranbuse&imageid="+imageid,async:false});
					document.getElementById(imageid).disabled=true;
					alert(thanks_report);
				}
function checkmailaddress(email)
	{
			var pattern=/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;
			flag=pattern.test(email);
			if (!flag)
			{
				return false;
			}
			return true;
	}
function check()
		{
			var email=document.getElementById("mailaddress").value;
			if(!checkmailaddress(email) || !email)
				{
					alert(invalid_email_address);
					return false;
				}
			if(!document.getElementById("username").value)
				{
					alert(no_username);
					return false;
				}
			var password1=document.getElementById("password1").value;
			var password2=document.getElementById("password2").value;
			if((password1!=password2)  || !password1 || !password2)
				{
					alert(password_no_match);
					return false;
				}
			return true;
		}
function confirmnewpassword()
		{
			var password1=document.getElementById("password1").value;
			var password2=document.getElementById("password2").value;
			var password3=document.getElementById("password3").value;
			if(!password1)
				{
					alert(no_old_password);
					return false;
				}
			if((password2!=password3)  || !password2)
				{
					alert(password_no_match);
					return false;
				}
			return true;
		}
$(document).ready(function() 
		{
			$("#creatgallery").click(function()
											  {
												  var newgalleryname=encodeURI($("#newgalleryname").val());
												  if(!newgalleryname)
												  	return alert(new_gallery_inform);
												  queryobj=$.ajax({url:"/user/managefile.php?act=Creatgallery&galleryname="+newgalleryname,
																   async:false});
												  if(queryobj.responseText=="OK")
												  	{
														 location.reload();
													}
												  else
												  	{
														alert(queryobj.responseText);
													}
											  });
			$(".deletegallery").click(function()
											  {
												  var galleryid=$(this).attr("id");
												  if(confirm(delete_gallery_inform)==true)
												  	{
												  $.ajax({url:"/user/managefile.php?act=Deletegallery&galleryid="+galleryid.substr(1),
																										async:false});
												  $("#G-"+galleryid).css("display", "none");
													}
											  });
			$(".lockgallery").click(function()
											  {
												  var showboxid=$(this).attr("id");
												  $("#LG"+showboxid).css("display","block");
												  var gallery_id=String(showboxid).substr(1);
												  $("#GN-S"+gallery_id).css("display","block");
												  $("#RS"+gallery_id).css("display","none");
											  });
			$(".showchangegallerybox").click(function()
											  {
												  var showboxid=$(this).attr("id");
												  $("#R"+showboxid).css("display","block");
												  $("#GN-"+showboxid).css("display","none");
												  var gallery_id=String(showboxid).substr(1);
												  $("#LGL"+gallery_id).css("display","none");
											  });
			$(".hidegallerybox").click(function()
											  {
												  var gallery_id=$(this).attr("id").substr(2);
												  $("#RS"+gallery_id).css("display","none");
												  $("#LGL"+gallery_id).css("display","none");
												  $("#GN-S"+gallery_id).css("display","block");
											  });
			$(".querygallerynewname").click(function()
											  {
												  var galleryid=$(this).attr("id");
												  var newgalleryname=encodeURI($("#I"+galleryid).val());
												  var queryobj=$.ajax({url:"/user/managefile.php?act=Renamegallery&newgalleryname="
																	  +newgalleryname+"&galleryid="+galleryid,async:false});
												 	if(queryobj.responseText=="OK")
												  	{
														 location.reload();
													}
												  else
												  	{
														alert(queryobj.responseText);
													}
											  });
			$(".querylockgallery").click(function()
											  {
												  var gallery_id=$(this).attr("id").substr(4);
												  var lockpassword=encodeURI($("#LG_P"+gallery_id).val());
												  var queryobj=$.ajax({url:"/user/managefile.php?act=LockGallery&lockpassword="
																	  +lockpassword+"&galleryid="+gallery_id,async:false});
												  if(queryobj.responseText=="OK")
												  	{
														alert(lock_succeed);
													}
												location.reload();
											  });
			$(".deleteimage").click(function()
											  {
												  if(confirm(delete_image_inform)==true)
												  	{
														var imageid=$(this).parent().parent().attr("id").replace("_",".");
														$(this).parent().parent().css("display", "none");
												  $.ajax({url:"/user/managefile.php?act=DeleteImage&imageid="+imageid,async:false});
													}
											  });
			$("#showfindpasswordbox").click(function()
											  {
												  $("#loginbox").hide();
												  $("#findpassword").show();
											  });
			$("#showfetchpasswordbox").click(function()
											  {
												  $("#loginbox").hide();
												  $("#findpassword").show();
											  });
			$("#showloginbox").click(function()
											  {
												  $("#loginbox").show();
												  $("#findpassword").hide();
											  });
			$("#getbackpassword").click(function()
											  {
												  if(!$("#lostusername").val())
												  	{
														alert("please input username");
														return false;
													}
											  });
			$("#Login").click(function()
											  {
												  if(!$("#username").val() || !$("#password1").val())
												  	{
												  		alert(wrong_username_or_password);
														return false;
													}
											  });
			$("#addpaypal").click(function()
											  {
												  if(!checkmailaddress($("#paypalaccount").val()) || !$("#paypalaccount").val())
												  	{
												  		alert("Wrong Paypal Account");
														return false;
													}
												else
													{
														if(confirm("After binding cannot be changed")==false)
															{
																return false;
															}
													}
											  });
		});