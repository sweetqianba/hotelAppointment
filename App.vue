<style>
	/*每个页面公共css */
	/* uni-app默认全局使用flex布局。因为flex布局有利于跨更多平台，尤其是采用原生渲染的平台。如不了解flex布局，请参考http://www.w3.org/TR/css3-flexbox/。如不使用flex布局，请删除或注释掉本行。*/
	.rightImg {
		height: 100%;
		width: 40%;
	}

	.leftImg {
		height: 100%;
		width: 55%;
	}

	.fontSize8 {
		font-size: 8px;
	}

	.fontSize10 {
		font-size: 10px;
	}

	.marginLeft5 {
		margin-left: 5px;
	}

	.bgWhiteToGrey {
		background: -webkit-linear-gradient(white, #F0F0F0);
		/* Safari 5.1 - 6.0 */
		background: -o-linear-gradient(white, #F0F0F0);
		/* Opera 11.1 - 12.0 */
		background: -moz-linear-gradient(white, #F0F0F0);
		/* Firefox 3.6 - 15 */
		background: linear-gradient(white, #F0F0F0);
		/* 标准的语法（必须放在最后） */
	}

	.noBg {
		background-color: rgba(0, 0, 0, 0);
	}

	.bgTag {
		-moz-background-size: 100% 100%;
		background-size: 100% 100%;
		color: white;
		padding: 0 5px;
		margin-left: 5px;
	}

	.padding2 {
		padding: 2px;
	}

	.margin0 {
		margin: -30upx 0 !important;
	}

	.gif-black {
		mix-blend-mode: screen;
	}

	image[class*="gif-"] {
		border-radius: 6rpx;
		display: block;
	}

	.text-h2-cut {
		text-overflow: ellipsis;
		/*有些示例里需要定义该属性，实际可省略*/
		display: -webkit-box;
		-webkit-line-clamp: 2;
		/*规定超过两行的部分截断*/
		-webkit-box-orient: vertical;
		overflow: hidden;
		word-break: break-all;
		/*在任何地方换行*/
	}

	.sweet-margin-right4px {
		margin-right: 4px;
	}

	.sweet-margin0 {
		margin: 0;
	}
</style>
