
$(function(){
  /*.....................会员录入数据发送代码及页面效果开始..................*/
                 //会员卡号查询数据发送开始
                $("#vips_cards .vips_selects button").click(function(){
                     var vips_ID=$("#vips_cards .vips_selects input").eq(0).val();
                     $.post("hotel.php",{
                         ID:vips_ID,
                     },function(data,status){
                        //alert("数据：\n" + data +"状态：\n"+ status); 
                     });
                })
                //会员卡号查询数据发送结束
                //会员信息数据发送开始
                var vips_c_i=$("#vips_cards .vips_imformations").val();
                var vips_name;
                var vips_sex;
                var vips_birthday;
                var vips_id;
                var vips_integrals;
                var cards_password;
                var vips_tel;
                var cards_type;
                var vips_address;
                var vips_otherwise;
                var vips_timer;
                var vips_imformations;
                var vips_necessary_inputs=$("#vips_cards .input_no_warns");
                vips_timer=setInterval(function(){
                      vips_name=$("[name='vips_name']").val();
                      vips_sex=$("[name='vips_sex']").val();
                      vips_birthday=$("[name='vips_birthday']").val();
                      vips_id=$("[name='vips_id']").val();
                      vips_integrals=$("[name='vips_integrals']").val();
                      cards_password=$("[name='cards_password']").val();
                      vips_tel=$("[name='vips_tel']").val();
                      cards_type=$("[name='cards_type']").val();
                      vips_address=$("[name='vips_address']").val();
                      vips_otherwise=$("[name='vips_otherwise']").val();
                      vips_imformations={
                           "name" : vips_name,
                           "sex" : vips_sex,
                           "birthday" : vips_birthday,
                           "id" : vips_id,
                           "vips_int" : vips_integrals,
                           "password" : cards_password,
                           "tel" : vips_tel,
                           "cards_t" : cards_type,
                           "adderss" : vips_address,
                           "otherwise" : vips_otherwise,
                      };
                     isNum();
                },200);
                     //点击提交按钮
                     $("#vips_cards_btn").click(function(){
                       vips_integrals=$("[name='vips_integrals']").val();
                         for (var i = 0; i < vips_necessary_inputs.length; i++) {
                           if (vips_necessary_inputs.eq(i).val()=="") {
                             alert("请填写完整后在提交！！");
                             break;
                           }
                         }
                         shouldWrite();
                         isChose();
                         //提交数据数据
                           var logn=0;
                           vips_necessary_inputs.each(function(){
                             if (!$(this).val()=="") {
                               logn++;
                             }
                             if (logn==vips_necessary_inputs.length) {
                               $.post("hotel.php",{
                                   vips_im:vips_imformations,
                                 },function(data,status){
                                   alert("数据：\n" + data +"状态：\n"+ status); 
                               });
                             }
                           })
                     })
                     //数据提交成功后执行的代码
                     load_success();
                     function load_success(){
                        $.ajax({
                          type:"GET",
                          url:"/vips_imformations.json",
                          dataType:"json",
                          success:function(){
                            
                          },
                          error:function(xhr){
                            
                          }
                        })
                     }
                     //判断选择框是否选择函数
                     function isChose(){
                       var vips_all_chose=$(".vips_imformations .vips_chose");
                       var chose_lable=["性别","类型","证件"];
                       for (var i = 0; i < vips_all_chose.length; i++) {
                         if(vips_all_chose.eq(i).val()==""){
                           alert("请完成"+chose_lable[i]+"的选择！！");
                           break;
                         }
                       }
                     }
                     //所有应该填写而未填写的加上红色框开始
                     function shouldWrite(){
                       vips_necessary_inputs.each(function(){
                         if ($(this).val()=="") {
                           $(this).addClass("tored");
                         }
                       })
                     }
                     //失去焦点执行函数
                     function lostFocus(obj){
                       obj.blur(function(){
                         if(obj.val()==""){
                          obj.addClass("tored");
                       }
                       obj.css("outline","none")
                       })
                     } 
                     //获取焦点时执行函数
                     function getFocus(obj){
                         obj.focus(function(){
                             obj.removeClass("tored");
                             obj.css("outline","1px solid rgba(0,0,255,0.6)")
                         })
                     }
                     //调用失去和获取焦点时该执行的函数
                     for (var i = 0; i < vips_necessary_inputs.length; i++) {
                         lostFocus(vips_necessary_inputs.eq(i));
                         getFocus(vips_necessary_inputs.eq(i));
                     }
                     //充值金额和赠送金额和赠送积分的转换
                     function setGiveMoney(){
                       let bili=0.5;
                       let vips_give_money=$("#vips_give_money");
                       vips_give_money.val(" "+parseInt($("#vips_in_howmoney").val()*bili));
                     }
                     function setGiveMoney0(){
                       let vips_give_money=$("#vips_give_money");
                       vips_give_money.val("0");
                     }
                      function setGiveMoney1(){
                       let bili=0.5;
                       let vips_give_money=$("#in_money_num");
                       vips_give_money.val(" "+parseInt($("#vips_in_howmoney").val()*bili));
                     }
                     function setGiveMoney2(){
                       let vips_give_money=$("#in_money_num");
                       vips_give_money.val("0");
                     }
                     //
                     $("#vips_in_howmoney").change(function(){
                       let vips_give_money=$("#vips_give_money");
                       isAllNum($("#vips_in_howmoney").val(),vips_give_money,setGiveMoney,setGiveMoney0);
                     })
                     //
                     $("#in_money_num").change(function(){
                      let in_money_num_free=$("#in_money_num_free");
                      isAllNum($("#in_money_num").val(),in_money_num_free,setGiveMoney1,setGiveMoney2);
                     })
                     //需要输入数字的input判断开始
                     function isNum(){
                       var vips_nums_inputs=$(".vips_in_num");
                       vips_nums_inputs.each(function(){
                         isAllNum($(this).val(),$(this),toYellow,addYellow)
                       })
                     }
                     //需要输入数字的input判断结束 
                     function toYellow(obj){
                       obj.removeClass("toyellow");
                     }
                     function addYellow(obj){
                       obj.css("outline","none");
                       obj.addClass("toyellow")//如果不是纯数字执行的代码
                     }
                     //判断一个字符串是否由纯数字组成函数开始
                     function isAllNum(obj,changeobj,funName1,funName2){
                       var newStr= new Array();
                       var vips_nums_inputs=$(".vips_in_num");
                       for (var i = 0; i < obj.length; i++) {
                         if (!isNaN(obj[i])) {
                            newStr.push(obj[i]);
                         }
                       }
                       if (newStr.length==obj.length) {
                         funName1(changeobj);//如果是纯数字执行的代码
                         //return true;
                       }
                       else{
                        funName2(changeobj);//如果不是纯数字执行的代码
                       }
                     }
})
                     //判断一个字符串是否由纯数字组成函数结束
     /*.........................会员录入数据发送及页面效果代码结束....................*/
   

 /*.in_money_footers button按钮代码开始——amazingui*/
   $('.btn-loading-example').click(function () {
     var $btn = $(this)
     $btn.button('loading');
       setTimeout(function(){
         $btn.button('reset');
     }, 5000);
   });
/*.in_money_footers button按钮代码结束*/
/*会员信息表格导出开始*/
var idTmr;  
        function  getExplorer() {  
            var explorer = window.navigator.userAgent ;  
            //ie  
            if (explorer.indexOf("MSIE") >= 0) {  
                return 'ie';  
            }  
            //firefox  
            else if (explorer.indexOf("Firefox") >= 0) {  
                return 'Firefox';  
            }  
            //Chrome  
            else if(explorer.indexOf("Chrome") >= 0){  
                return 'Chrome';  
            }  
            //Opera  
            else if(explorer.indexOf("Opera") >= 0){  
                return 'Opera';  
            }  
            //Safari  
            else if(explorer.indexOf("Safari") >= 0){  
                return 'Safari';  
            }  
        }  
        function method5(tableid) {  
            if(getExplorer()=='ie')  
            {  
                var curTbl = document.getElementById(tableid);  
                var oXL = new ActiveXObject("Excel.Application");  
                var oWB = oXL.Workbooks.Add();  
                var xlsheet = oWB.Worksheets(1);  
                var sel = document.body.createTextRange();  
                sel.moveToElementText(curTbl);  
                sel.select();  
                sel.execCommand("Copy");  
                xlsheet.Paste();  
                oXL.Visible = true;  
  
                try {  
                    var fname = oXL.Application.GetSaveAsFilename("Excel.xls", "Excel Spreadsheets (*.xls), *.xls");  
                } catch (e) {  
                    print("Nested catch caught " + e);  
                } finally {  
                    oWB.SaveAs(fname);  
                    oWB.Close(savechanges = false);  
                    oXL.Quit();  
                    oXL = null;  
                    idTmr = window.setInterval("Cleanup();", 1);  
                }  
  
            }  
            else  
            {  
                tableToExcel(tableid)  
            }  
        }  
        function Cleanup() {  
            window.clearInterval(idTmr);  
            CollectGarbage();  
        }  
        var tableToExcel = (function() {  
            var uri = 'data:application/vnd.ms-excel;base64,',  
                    template = '<html><head><meta charset="UTF-8"></head><body><table>{table}</table></body></html>',  
                    base64 = function(s) { return window.btoa(unescape(encodeURIComponent(s))) },  
                    format = function(s, c) {  
                        return s.replace(/{(\w+)}/g,  
                                function(m, p) { return c[p]; }) }  
            return function(table, name) {  
                if (!table.nodeType) table = document.getElementById(table)  
                var ctx = {worksheet: name || 'Worksheet', table: table.innerHTML}  
                window.location.href = uri + base64(format(template, ctx))  
            }  
        })()
        //加载  
        $('#bra button:eq(0)').click(function () {
            window.location.reload();
        }).next().click(function () {
            $('#main').load('report-forms/month-form.html')
        }).next().click(function () {
           $('#main').load('report-forms/summary-form.html')
        })
        /*会员信息表格导出结束*/