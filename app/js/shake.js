/*
 *
 * @authors H君 (qq:262281610)
 * @date    2014-10-23 19:54:33
 * @version $Id$
 */
;
(function($) {
	$.fn.shake = function(options) {
		// 默认参数
		$.fn.shake.defaults = {

		};
		var opts = $.extend({}, $.fn.shake.defaults, options);
		return this.each(function() {
			var $Element=$(this),
				loadingS=$('#Loading'),
			 	$shake = $('#musicSwitch'),
			 	shakeThreshold = 1000,
			 	lastUpdate = 0,
			 	shakeStatus=true;
			var x = y = z = lastX = lastY = lastZ = 0;
			var awards=new Array(100);
			for (var i = 0; i < awards.length; i++) {
				if (i ==0) {
					awards[i]="一等奖";
				}else if(i == 1){
					awards[i]="二等奖";
				}else if(i == 2){
					awards[i]="三等奖";
				}else{
					awards[i]="谢谢参与！";
				}
			}
			var _html=['<div class="awardsBox" id="awardsBox">',
						    '<div class="awardsBoxCont">',
						        '<a href="javascript:;" class="close">x</a>',
						        '<p>暂无中奖</p>',
						    '</div>',
						'</div>'].join('');
			$('body').append(_html);
			function init() {
				if (window.DeviceMotionEvent) {
					window.addEventListener('devicemotion', deviceMotionHandler, false);
				} else {
					alert('not support mobile event');
				}
				setTimeout(function(){
					loadingS.hide();
				},500);
			}

			function deviceMotionHandler(eventData) {
				var acceleration = eventData.accelerationIncludingGravity,
					curTime = new Date().getTime(),
					awardsBox=$('#awardsBox');
				if (shakeStatus) {
					if ((curTime - lastUpdate) > 100) {
						var diffTime = curTime - lastUpdate;
						lastUpdate = curTime;
						x = acceleration.x;
						y = acceleration.y;
						z = acceleration.z;
						var speed = Math.abs(x + y + z - lastX - lastY - lastZ) / diffTime * 10000;

						if (speed > shakeThreshold) {
							shakeStatus=false;
							var randomAward = (1 + Math.random() * (100 - 0)).toFixed(0),
								text='';
							if (randomAward < 2) {
								text='恭喜你获得'+awards[randomAward]+'!';
							}else{
								text='谢谢参与！';
							}
							awardsBox.find('p').text(text);
							awardsBox.show();
							awardsBox.on('click','.close',function(){
								$(this).parent().parent().hide();
								shakeStatus=true;
							});
							$('.shake').addClass('shake-music');
							setTimeout(function(){
								$('.shake').removeClass('shake-music')
							},2000);
							$shake.attr("src", "../../shake.mp3");
							$shake.load();
							$shake.play();
						}
						lastX = x;
						lastY = y;
						lastZ = z;
					}
				}
			}
			init();
		})
	}
})(window.jQuery || window.Zepto)