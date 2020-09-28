window.Paramter=function(){

};
Paramter.prototype={
    append:function(name,values){
        if(!this.paramters){
            this.paramters=[];
        }
        if(Array.isArray(values)){
            for(i=0;i<values.length;i++){
                var value=values[i];
                this.paramters.push({name:name,value:value});
            }
        }else{
            this.paramters.push({name:name,value:values});
        }
    },
    query:function(cha){
        if(!this.paramters){
            return '';
        }
        var query=[];
        for(i=0;i<this.paramters.length;i++){
            var paramter=this.paramters[i];
            query.push(paramter.name+'='+paramter.value);
        }
        return query.join(cha);
    },
    formData:function(){
        if(this.paramters){
            var formdata=new FormData();
            for(i=0;i<this.paramters.length;i++){
                var paramter=this.paramters[i];
                formdata.append(paramter.name,paramter.value);
            }
            return formdata;
        }
        return null;
    }
};
;window.http={
	get:function(url,paramter,option){
		var that=this;
		return new Promise(function(resolve,rejec){
			try{
				var xmlHttp=that.getHttp();
				xmlHttp.open('GET',url+(paramter?'?'+paramter.query('&'):''));
				if(option){
					if(option.headers){
						for(name in option.headers){
							xmlHttp.setRequestHeader(name,option.headers[name]);
						}
					}
				}
				xmlHttp.send();
				xmlHttp.onreadystatechange = function () {
			        if (xmlHttp.readyState == 4) {
			        	if(xmlHttp.status == 200){
							resolve(xmlHttp.responseText);
			        	}else{
							rejec(xmlHttp.status,xmlHttp.responseText)
			        	}
			        }
			 	};
			}catch(error){
				rejec(error)
			}
		});
	},
	getBlob:function(url,paramter,option){
		var that=this;
		return new Promise(function(resolve,rejec){
			try{
				var xmlHttp=that.getHttp();
				xmlHttp.responseType = 'arraybuffer'
				xmlHttp.open('GET',url+(paramter?'?'+paramter.query('&'):''));
				if(option){
					if(option.headers){
						for(name in option.headers){
							xmlHttp.setRequestHeader(name,option.headers[name]);
						}
					}
				}
				xmlHttp.send();
				xmlHttp.onreadystatechange = function () {
			        if (xmlHttp.readyState == 4) {
			        	if(xmlHttp.status == 200){
							//Blob()的第一个参数必须为数组，即使只有一个字符串也必须用数组装起来
                            resolve(new Blob([this.response], {type: xmlHttp.getResponseHeader('Content-Type')}));
			        	}else{
							rejec(xmlHttp.status,this.response)
			        	}
			        }
			 	};
			}catch(error){
				rejec(error)
			}
		});
	},
	post:function(url,paramter,option){
		var that=this;
		return new Promise(function(resolve,rejec){
			try{
			    var xmlHttp=that.getHttp();
			    xmlHttp.open('POST',url);
			    if(option){
			        if(option.headers){
			            for(name in option.headers){
			                xmlHttp.setRequestHeader(name,option.headers[name]);
			            }
			        }
			    }
			    xmlHttp.send(paramter instanceof Paramter?paramter.formData():paramter);
			    xmlHttp.onreadystatechange = function () {
			        if (xmlHttp.readyState == 4) {
			        	if(xmlHttp.status == 200){
			        		resolve(xmlHttp.responseText);
			        	}else{
			        		rejec(xmlHttp.status,xmlHttp.responseText)
			        	}
			        }
			    };
			}catch(error){
			    rejec(error);
			}
		});
		
	},
	//https://juejin.im/post/5ba2486fe51d450e41154d15
	postBlob:function(url,paramter,option){
		var that=this;
		return new Promise(function(resolve,rejec){
			try{
			    var xmlHttp=that.getHttp();
				xmlHttp.responseType = 'arraybuffer'
			    xmlHttp.open('POST',url);
			    if(option){
			        if(option.headers){
			            for(name in option.headers){
			                xmlHttp.setRequestHeader(name,option.headers[name]);
			            }
			        }
			    }
			    xmlHttp.send(paramter instanceof Paramter?paramter.formData():paramter);
			    xmlHttp.onreadystatechange = function () {
			        if (xmlHttp.readyState == 4) {
			        	if(xmlHttp.status == 200){
			        	    //Blob()的第一个参数必须为数组，即使只有一个字符串也必须用数组装起来
			        		resolve(new Blob([this.response], {type: xmlHttp.getResponseHeader('Content-Type')}));
			        	}else{
			        		rejec(xmlHttp.status,this.response)
			        	}
			        }
			    };
			}catch(error){
			    rejec(error);
			}
		});
	},
	saveBlob:function(blob,fileName){
        // window.navigator.msSaveBlob：以本地方式保存文件
      if (typeof window.navigator.msSaveBlob !== 'undefined') {
        window.navigator.msSaveBlob(blob, fileName)
      } else {
        //创建新的URL表示指定的File对象或者Blob对象
        let URL = window.URL || window.webkitURL
        let objectUrl = URL.createObjectURL(blob)
        if (fileName) {
          // 创建a标签用于跳转至下载链接
          var a = document.createElement('a')
          // download：指示浏览器下载URL而不是导航到它，也可设置下载文件的名称
          if (typeof a.download === 'undefined') {
            //# window.location：获得当前页面的地址 (URL)，并把浏览器重定向到新的页面
            window.location = objectUrl
          } else {
            // href属性指定下载链接
            a.href = objectUrl
            //# dowload属性指定文件名
            a.download = fileName
            //将a标签插入body中
            document.body.appendChild(a)
            //click()事件触发下载
            a.click()
            // 去除a标签，以免影响其他操作
            a.remove()
          }
        } else {
          window.location = objectUrl
        }
        // 将URL释放
        URL.revokeObjectURL(objectUrl)
      }
	},
	put:function(url,paramter,option){
		var that=this;
		return new Promise(function(resolve,rejec){
			try{
			    var xmlHttp=that.getHttp();
			    xmlHttp.open('PUT',url);
			    if(option){
			        if(option.headers){
			            for(name in option.headers){
			                xmlHttp.setRequestHeader(name,option.headers[name]);
			            }
			        }
			    }
			    xmlHttp.send(paramter instanceof Paramter?paramter.formData():paramter);
			    xmlHttp.onreadystatechange = function () {
			        if (xmlHttp.readyState == 4) {
			        	if(xmlHttp.status == 200){
			        		resolve(xmlHttp.responseText);
			        	}else{
			        		rejec(xmlHttp.status,xmlHttp.responseText)
			        	}
			        }
			    };
			}catch(error){
			    rejec(error);
			}
		});
	},
	
	delete:function(url,paramter,option){
		var that=this;
		return new Promise(function(resolve,rejec){
			try{
			    var xmlHttp=that.getHttp();
			    xmlHttp.open('DELETE',url);
			    if(option){
			        if(option.headers){
			            for(name in option.headers){
			                xmlHttp.setRequestHeader(name,option.headers[name]);
			            }
			        }
			    }
			    xmlHttp.send(paramter instanceof Paramter?paramter.formData():paramter);
			    xmlHttp.onreadystatechange = function () {
			        /*
			         * xmlHttp.readyState
			         * 0－未初始化，即尚未调用 open。
			         * 1－初始化，即尚未调用 send。
			         * 2－发送数据，即已经调用 send。
			         * 3－数据传送中。
			         * 4－完成。
			        */
			        if (xmlHttp.readyState == 4) {
			        	if(xmlHttp.status == 200){
			        		resolve(xmlHttp.responseText);
			        	}else{
			        		rejec(xmlHttp.status,xmlHttp.responseText)
			        	}
			        }
			    };
			}catch(error){
			    rejec(error);
			}
		});
		
	},
	getHttp:function(){
		return this.getXMLHttpRequest()||this.getActiveXObject();
	},
	getXMLHttpRequest:function(){
		return window.XMLHttpRequest?new XMLHttpRequest():false;
	},
	
	getActiveXObject:function(){
		return window.ActiveXObject?new ActiveXObject('Microsoft.XMLHTTP'):false;
	},
};

