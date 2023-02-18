function getCurrentPlayerName(currentPlayer) {
      	switch (currentPlayer) {
      		case 1:
      			return "riccardo belmonte";
      		default:
      			return "ics";
      	}
}

function switchToNextPlayableCharacter(){
	if(currentPlayer<maxCurrentPlayer-1){
		currentPlayer++;
	}else{	currentPlayer=0;}
	var tempPlayer=player;
	player=nuovoPlayer(currentPlayer);
	player.x=tempPlayer.x-(player.width-tempPlayer.width)/2;
	player.y=tempPlayer.y-(player.height-tempPlayer.height);
	player.facingRight=tempPlayer.facingRight;
	player.life=tempPlayer.life;
	player.power=tempPlayer.power;
}

function nuovoPlayer(currentPlayer) {
      	if (currentPlayer == 0) {
      		var player = new Player();
      		return player;
      		//prototipo del player X
      		function Player() {
      			this.name = "ics";
			this.spriteDefault = new Image();
      			this.spriteDefault.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAUAAAAFACAYAAADNkKWqAAAAAXNSR0IArs4c6QAAIABJREFUeJztnb+O3Li27lcdHMAwnNBvoI6cNhz5ZP0ABxe90QdwtB9hAAd2NMBgMAeOZgID+xEcDbAb6GAewDc6joxOTuDISm9kJoONiXSDqqVaWkVKpMQ/qtL3AxrdrVJpkRT5cXGREokAAAAAAAAAAIBNsKudAADAPIwxnfzfWjurPfN1fN9PZQcAAKIxxnRShPr/b2xn7fFHnqe/M3V9/r7T7oidcwdKDsCKMcZ0bdsSEVHTNEREZK9b57n2gfrz5HfGPDYWMn2+MaYLsXPu3uBZJx6AS0aKn6Rpml4E7QORuRXfeWz6v0NEkG2ciKYSvzE7JUTwLT0beJy/0Z9JbP57iousga3HKbae/y0gRYro6Inxbxaob9++Dc4/CFw3t05M2bm6upp97SlY+F69fEF3P/5y/ODudUe0XAiTJbpWA+wDuNdtf4OIxHDhwoVg6/m/ZHgY6rqv7LUxLIzmdu+dffv2ja6urgbnuuqC9jL5+9IrDLGTo569pWfdq5cvnJ+xGL67e71IBBcnumYDXEucoqb4ryH/nJaBfQjvYlz31yVOWuykiBGFxQGX2Cklfnc//kL373/q///85Wv/91wRXDQE1gUnYwT2WPhZ3GPXTZNxCr45/bmZ0kDkFP/RZQWpbNfOP1+b6OgZMCXK4NKx1u7MY3Nyn6VHJvn27Rs1TUOG9nUyVKAW2Sl0f9nj498shL/e/344Yd6QeHbipxogUd5AqbYvBYho6KITUXI3vbb3VTv/rjRILmmmsCYnToZjkqPrhitSrq6u+kmMGA9N2uK2LD1Jp53DjDFR2jb+lp51v97/Tu/uXhP/Zlj07t//1HuBfGzpkDgYXh/EP3KdkLX7Y8aY7vv3793379+TrxuSa5fk2iT+X6chpX1X3uX/Mi251kvVzD/bl3n2lUX2dWOeMi+6Vi3zfZdlLctX3/v+PovP59ji67rsuNqzTsfS/L6lZ90/X77s3tKzrrv/w/lbH5M/esZ4jEVDYPtAgxgB07btoQdp6erq6IWkgnsqaVvGKfr4Y9v2acjlhUzNkBGlnyVbU/4lrrIwt0SGiONH6crhxu4X/AqPiKhwOEKlIZdtHqLqMAPXAebq6mrQFufYZY+uaRoi4XnyNTkGaK9bMo9NJz9vE4a92LOTnp9Ee4VziRZAqfA1GyBXutxxCplfvs7YDJkW/lwzZKXy39tz9Ox64a27LJZaduAQv+KxaJGGErattTsWVI7x9Z8poUoiuMZ0Mm96GC5FX9ZF17rFOegJEB4KE7nFT34eQ1RBTcUj5EyRnDHKGXviNEzFKZbakbbYXtAMmaggqcqhVP5d9timzNdUWSRdETAhfkQFYtEe8Sth29URhc72zrXF9bk/fogL9hNuj0PhW5oOngHWEx5y1lfG/OT/fP7nL1+DYoHBiRwrDD5OlKcB6nS4puw5DdwAl9qenGV12NTCz6SuoFPLFlJNfMhZbgmHPnz4yiIoLZ6h7cC+EF+dviSTQSNpsNbufAJYYyLOdTxHRyu9/d6O6IRT13GeBGFY6E4WRB8+0x5jqAAGDYHlgkw5zS5hD4ArPtExXpBjGYbuaftpf2F37gwVLw4dG75pD6jruj7fMv/SO1q6Iv8kDaoMTuI0CcRPLnw9se/wCvf2h3Hf4NiQQ3hc9k/ifilj0SINHtsdSfGtHAfnNMh0mse0dWxwbTrWKx0DJEonvr/Rnzu6e92vBfQtiF7Kv02dIAtaNmSOA9jrluTnRPsGyI2f6OA1JpwVk8H2fq2bSA/RUfz69Ea8GYPTLXt089g4vR4tOgz/r7+TqixcZSDvRYqKKIc1fUNwlMOJJ3Td9nVAHh/N+4j4Sft8/bZt+/zqWDTRMQbaNA3Zh2OaQgW4uO2Z9MtVcsRatR3d8Vi70z+p7cphrwv2DKVXGOr9EUVOgkg3l//ngh+sO1JDFD53qffDYuwahnK65OLfFN4X9/Cy19ON3SWC8o0a0ktIxaDCH8r7OExJZuZwvabv9PpyMKZzDYVlGvo6cXs6PIy17YIbv54NlcjJIE43UVgHUdP2FDwz3DQ0mK0lOs7Q5hCkQ3l0qeONLn6jP3dv6VmnRfCzmAB59fIFff7ydTApErMOcPJE1/OIjKwgUhSb5jRIzuekEECJThfbJnILZIh95yuIRMPn81zDZNkB6PhQqmFCcDnMsKM9NNckxlhsSArGIETxMJEmT9xNB9clrgmqsVi0/NyZlkMa+HpFbc9gbCF6qkfU9LPCun3lFkE9IUJEg8fhmBivTzI5BD70NN7P2f2Ww2D+W4vIUqbSoplr/7DkwClY/Dd7ovbhODzgRsPDHknKGElsOYTQL4C9Pg7vpHfjEj+i4fCLy42P9+cchs2jef9k+nKV8H2Q9UpeV+LzxmU4hnEOxw9pkNfqbVu7kyGG5LYj8C045jq4tG7oxdyy/bhGdyVg0fOt/Xv18sXJK7NCiJ4YYFwVcuDlCA8hZePntGgPhNPUpyWRfddD/r7lMTLueJKezLN/Pm8l1ON1eRLSi9VeDtGpyLm85NA0jOJZ+qL/d83SS3SsLsoTUzO/RW0LXEugZDr68xZ4Z4O1ryP1ooQHSHT6LkDXjC+T9VlgPfwjcg99XB5Xkel/X8VIIHwuXHnO9WykTlvI8CykgoaIX39dxzCbKMM6tMClMDJNOgQj0zUWM44dkhex7cG3HtN7/gyB8i190jZLiZ9GvyXm85evpP8nChfCKA/QFdOSvb6OieUopKneKYXdfrLFsdpdoz2i1IueXWnTQyqX50s0XwDHGpZ+yYFeLrNIBAOEz8Vk5+tZzO5MZ2QaktqeIFYA+3Mil4BNiSpRvvodgvQIfctjki6E9jYSUQgh5yxF9k5SnFLb9InsmAi6JkOI0g77dXpObM0cAk151E5bvuHuHO8gwNtydUYhXoqLUOErZjsAXSdjOolYAWQbJ59V8vo0vhel6tniJAuhp3qE0HOW4mtoOk6V65ljF2yraZrOsxTB/QztwqGPL31zPQzfuXKhq+/cwZCfh4YxyzAixU9/5uWT2dlJ4/40FLMdgazzg+MZnzUvOeM7B986wSTrAEsIWwh6SCoXYMsKkWz1u7rOnKC+b3gSO7wbi0X6Gmyucoj6boQIuoL5c2czl3qfRW3P4GQCJsfialGX1jDkdeETPvYM3375GvSC1OknQRxT667KoT/vxSrTO9lkhc0t0lOr3UOXpSyJx+jrnwxFKyxN0LjqSOz78byxx4klMP1oYKFo17IdSsn73Hv0KxM/n6jJYfGrly/6pTFjy2O8HuDYSweIHEOh8bjcolXpvOpd934hQeBScBr7/z3LZGZde2J2m4ehtURQDoMHx2fUg5A8uLy0JIt+K9oOocTQV9tbm/gxLIJy1zhm6vE5iVMAfUNfX0PUn7uOpxLBk7SuyEXXawQXC5/Is/Z0SzeGUHwTMkSRcUlPoL/E/bZ2+MaXkrZD2bL4uZgbC3QHvyeGK66CCRnipHo0J/U1U5NjHWCKyZTcJHs909TrqErgmhipXN6515eWspEa1xC3yL4gAAAAAAAAAADA+YBxMgBnyjnEw9cOCgyAlaMnJuSTN663Ic1+AcIGBXRzGQbgnHC+nDfwRRWxNqa+d4ke59lnAIBLxfXmH6LhuziXbsMZ8jaf1B7nmojeGH2tXGLvFMPW878F5AtViY4en965TexKGPTwwdjeOa43gPf2Q3f7WzGLBHANjW6kd9pEXGPr+b905IZSg/1Z1IZUvBVDym04J/fGFu+/zLH1bQlmCeBaGt1aeqdaHcFa8s9pkf+fY2NYK4MhLg09tqZp+t3niPb3nUUw5h7IN1gbzzmpPM4lpH7qY/FbaSVzg7BzmOqdiPI/xlQzNrKG/HM6iC4zPrQGfPvPENFAAK+urvrfRHHlPvbiEy220jbR0Qtk27nuNwvfr/e/E9Hp5khzRTDKA1yzS1y6d1qT90VUp3deWxlskbZtqeu6/j5LEQz1yuXbljRS/FJ6nDG43vjCf3/+8nUvinevuzkiGL1eSO8LMvhc9AZElLVH0Bufl+yd1uB91cw/269dBkQ0uYdHdvG9sd7XkOWob3r3OXnvpfgROV9HNpoul50cHmcM0vN7d/ea9B7BzP37n+i/vnzJL4BrcInlG6JdvZPciJrTk7Pxl+4IaudfpoEp3hl6hK/oUFyJX07bckmMr5MhOt2Njmg4KpjaoF4ui/HtaOfa+N31TsgU+eb9P+Trrqb2A4nxBIOHwFzh1+ASEx1vimsnLiLq02Ro2Y0YbEYjrsMVydURpJ6Nc6arUP7HqFYGI3t4EBUaih/SUMq2tXbHk4xG2ZR/66UyOk2++iLtGGO6pmmIlA2+Nnt/RDQYbrtegMvXnM7hKez9+ba+1MjX4WfbFjPUJWZyeoBEYb2TJjRNYwFotlnb+8qZ/yn7VTzQCfEjKjAUV5ukl7TteueiXsTs29kt5oWuegfGmJchx3icLnTMj4e89+9/6s/RoiiPubbE5Gvq41ECSESDN/WONTr9+A5RugowNWOle6c5FWFywqdibMRXBinzP2Xf99nizjBwU3SfACYZik+9kNUjgDVCIa7j+plhfTz2+r5tX+WQX38uz4uxzUNeLXp3P/7SxwCJjmIn44Hv7l73s8RaLDmGSDQUwVkFQnSshK5Gp13wpmmGe4YsHJJywUsx8r1CfU7P5Nrknb/v6t1Lel+cPlcZuEjZM7vSwLbl33LI6+oMvTYdwhMa90oWlxZpKG47Aj1hIdOZyuN22RgbQi/taN/Ss44FTHL//qeTYS+LnxQ6olPPkAWSxY+FkEUwupDGhoWuxiZjEqkanhRY1w1Z0jPp62uBCVmTRZTP+3KlU5dBjp7ZZV8Pj/S1dVo4PU7bI+Inv9tf1zMbumgo7hC/YrYjcXWC/WcJBVB3AmPXXuJxSvFjT07+ll6bXAw9NiHiWzNIdPQCJ7fFHMM+HALeE1tTmttjAU4FYcfoG93henyt9vAMY3/eY0NNs/9ZurGOfTje9MN6qeHnh3xzWq6urpziZx8OP9f7tKbYLpTLQZY/T0Ckyr/Truchfc4jf9Z7hUo8Yspg1OPgtY/Xrfe8fjJIrE8NLftctlPce66LPgcg9Xa03A7atiVrrTMP3Eb4Z44dFispWr/e/z4Qvd/oz50UxLsff+k9Pf79G/25e3f3+kT8tIeZLAYU4hWm8joGdlXcxeVdxvZMzlcQie+MxUZkmnJ5X5yG0LKIyX/IudL7cA37+vOU8HEohMhRBp6425i376pbo0s1puqimNnVXmBK2177kYw9lZXDCyQ6vYcpvdq39KzzeXquWV3fkJmITrxGeb3ZMUDJ6FDY0ej4+Fx7PrshAjjXTm/DIaihsZGcQ2B9/SVlETpzOLVf9FjczCt+zNSiZkecV8chfXFpXU4cjjHGONOg06EnP5bYJhqxH4COxbvS26d5BmMzzf1wnsMflZ/y0SKoJ0pmbYs5hW9R5tL4Xox9LUBE6Wec2Zb8n8U91LPN9ZIAuSid6DTWNjnhoK7l8iRcyx9c970/19PxaaLLwLP0xRVr9M3Su7zxqAasZn6X2o62z99xLIGS6VhybWnDdc3BtSsKoOvROMa1ZnBMBGdPizMyDqeP5X4AX5PSNQ9pyCXzLHHF4FxDtJByCBG//poOD5No/GWaswhcCiPTJNMS4o1PeuJjS2EW2g6y78DV8Y7G3mcKLJFb+KTNmuLnEj4fyQTQNfSUFd61dCTXIuA+DZniH3rR99giUD1jnGqI60uXtkmkPN9IL8A3pPWVrX7jj07TIhEMED4Xvlidb2kU0TzhS2V71P4IsQLYn7NAZF3XIyrT0WtixY8okQB6G8lIbMx3zhJci7FD0jXXjr6+r0L7FooSpR3yjgk+0fwh0JRH7bTlW2w7xzsI8LZkHn33XqYx1TC7iO0AXGtwQ4kVQLZx8lnlmJ8UQNe6QPkkiDy2SABHh0hqZjRnoblEyRmMzvS4kYuxiQGZPt/3YtIzJX5LbfjshlzX1WiC70Wk+PXXTjn0CxS/LLYDcT2KyuR8uiTXjO8cfOv/XGLIx6cmQUZfhjDlDpdC33yuhHwstbe1dBmNTKPreAxjYuxrsLnKIeq7+3sT9BIAVzBf3tcYlopfUdszOJmAyWBP1qWaQ14XriGw9vpimFwIzYUgC91XOfQ5vWAlXpQpbU0twk7B1AJP1wJpF0viMfr6J0PRGQ02Na46Erv41xt7HFl6w/8vFaCatkMpeZ/7yZ6ViJ8P6QHq12a5XqEv8WZsar2XL/6XKzbnGwKsyUWfih0uHfqe5N2xOHuOnRToYbDLA3beo5EXikqmRCjnxEs22xHkWlfrsrOmNqXREyFymOsaIs+KAYbMBE1NgIR+L4YxL2ItN8rltaXIc47JnpT4YkdEE+XgEUDXWrvJa83BFf9Ti56z2Y4g13pSl521LHL2EfKEyNjnEq8Ajn3JVzBZFsFO2FjjTepFK2NwOvX1UzD1eqZgpl5HVQKfMFYkR72qYQMAAAAAACwlxyRjTTslWfQ6LABAeVyz6llWWhSyUxMIIABnCL9PcfBqtgziVMoOAAAEYYzprLWdtbajm+OPPbyoNJVATdlJYSOWqXV9sVycB7j13mnr+d8CY++AdL2pew5T790s5Qm+pWedFr2UIphcAEs3wC3EKcbYev43yafhS1Sn3kA+B9eaXpedEnWNX4nPwqdfkb+ExQK4hga4pjhFDbtryj8RBLgU+mXENex8+/atmAi+evmCXr18Qffvf0omgkk8wDU0QLk5k7ktkwbfq8P5eMkyqJF/Zg2d4KYQi7R58ysiSvpG9sFOfj47By8xlwjqx97kHsBEaTzBZEPgWgJUM04hhV+LgOutzampnX+XrbV4oZcMCxDXL959Th5bijFmN2XHPDb0/G+75Bu+E/lffqo3TOdz59pZJIA1G6Dv2eNScQr5jK78IUoXiJ6yv6Y4DVFdL5RnKGPfPpMrDTnNGM9GSixQJe2UemZYCp7LE5zLbAFcWwMsGacYvHnFE3vh/SGstWWGoZXiNNU6QS14jnf4Za93Kg1FbR+Q3pn8XcpOTvGTQvf5y1eS+/ze/fhLvwPc7u4/yz+3bIwZrAvi33LdEK8X+v79e/Jekdco6fVPcu0Sp/H79+9J08DX1fmV5cH2cwlgzfzLNOg86/JIvTatx+HxucohqxCJNBS3Tcc6wDZz3GNtJ1ddcvGWnnXd/R+d6zf/nTsNXtbSAKXQyEowqIQJhyV9Y3YIv270Mi0pbLvSUjr/2v5UJ8i2k99/jwAWXbSrBHBNC4YvBSl2+nfVhOlGVqMButLB9mU6Ug9/deMuLfw6PSXzr21PdYL9vT+UR5K0uOJ9HvEd3JOU3AzzVtT2BmHR45/a6SGiY+ObaoAl0sGVjUUnp9cZKvylyqBk/l0U7QQ94ld0GK7Er0oIACRh0SywDoCWCsi60sGzUldXV/3xHNPzfD3fbJucIeO05J4lK5l/F2xbl8lh8mW/j8on49xPJZpPZvRaRSaDDmmoYhusE1+g9JJvem3PS6dF/5S0r9PC5VDCVs3JsNpxcLAi1tIAS7JF4V8bNWPRa4iDA1CNNXleW6ZmLHoNcXAwD2x8Ai4GY46PH3bdUHNyx0Nr2gYAACKqt2i3tm0wD/RK4OJwiU4pD6ymbQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGCl4Hnj+STbGB0AUAbXK7YggvOAAAJwhvB+yyx8JTehvySxhQACcKa0bUv2ev9jbvOJ4CV7nBcngJdyY+ay9fxvAXvdHv9Wmy/lEsGaHmdOkghg7Q14LrV3CmHr+d8kakc6FkG5K13KjZ/471IeZ0lmCeDaGt1aeqdaZbCW/BNBfEtSahvOGh5nKWZ7gGtqdGy/dO+0po6gVu+8pjLYGuaxoaZp+v2Y7cN+b2YWrKUiaIzppPgxOT3O0iwaAtd2ifUNqtE71Z6Nq51/aWctneEWaJqGeBOmb9++9ULYti2Zx4ae/22XfDOmS9z4PVoA19Lo1tQ71fI+15J/ovqdId3Yfu/d4ltR1rQtYCEk2nuHS8XPWruT7Tu3x1mDKAFcW6OTuHonPpbjxqylI+jTUzj/RJXLQIvOY0PmsTlJXxbbIg3VbB+QXqD8ncrzM8bsWOhKe5wlWDQEru0ST/VOzPO/7ZKmZy0dQa38E62nDCTcQOX/l2rbWrvje311dUVXV1dERPT8+fNdahEyxjivl9rjrEG0AK7FJeYKMNY7ybTm7J1qeF9ryj9RnTJwUXMoXtq2tXZnjNlZa3fW2t3z58+zC1Buj7M0UQIY0uhKusRcAVyf5e6danpffRqEF6Ap0TtXK4Mb27HNPi2lh+KHNFSxXQHtcTLnOOyVxHuAEaJTmlK905q8L3ndkr1ztTKYEL/+WM6huEjD2sIAOZEe5/Pnz3c5httngzGms9Z21tru+/fvg5+a6THG9OkotQ5Q2pW/S84I1si/i9JlYIzpeELE2uNv/uH/ZZqSJqCmbVAX3ehqp6cGYx3BVit86c5Qi43smPgY3dgs96WmbQCq4/ICUdHLw+WvPS55jJetXJJtAAAgotMRSemh+BpCISCObQYwwcVi7X6CouuGepN9GZAxHU8EadsllqcAAEDVySCX7RJ2AQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAALh8nM8o/vDk58LJOA/+8dfPQeeh/EAMofWqNkvrtSufY9ecUy6haeRrL9oUaSv846+fo27GuVRoUJ9zqiul0hrb3vR3Y4AATnBOFRSA3CwRp9DrLyHWS4UAjgDxA8DNpbSNf485eSzTlxb3upQbDNbLudcxTn+qtp+iPP7x189R6Qn2AKcSx65x7ZuaqhDPlXNOOzhP1lbnYnRoUgDniFpJMXTZWWI3RZpLesOp8w/AHJa29xx1NuSaowKYypuqIYRzbJ6zcKTIf8q0gG2ytnY3de1ikyA1hse1lq7wtWoLQc1lC7XzDuqxtns/lp7RSZAfnqQXrdggpfzeXHtE5SdpSnm9IeeUyrtLBC9tcgykpbZYRs0Cp6JGwxgTwto3YQ6x3m0tISplO/Ypg5DvL2Hrwn8und+oAK5FGFIPT0tPUmhqVIyUnre8Ti4vtMSSiBKxp3MQgS0z+ixwbgFcQw9dS+RzPFeZ2m5pryjXvdB213TP1+Jk5CC2o8yJrw6czZMg6En3LJlMqil+U9csNRNYe3a8thCAIWcjgDmo3RhKUlv8xq69lgmjUsi0oGOvy2YFUFdC/qmVhpysuZGVFKY1iaAk5/2pVbfPhSqzwGthC5VijXk8lxnCnOgySDVZY63tmqahv//rjTO+D4ZsWgAvnbkik2P9p4u1emRrw3UfPz790LVtS0RE5nZ/zD6US1MspepULBDAimzdC9o6KTxhc3sUvqZpZl/HJ7L8t7V2R0RkjOn479jr1WIsLRBAwRp7qEtmrV7BOfD3f73ZNU3TGSIyty3ZByL2CImImqbp9DB4jijZ6/01zWPTWWt39rol89h0nIbZGRBpWlIHuvs/ut3df3rTMZVnCKAg5Gb88ORnZ884x9Ya4byZp2Z23kA55DBYDoHtdUv0Px9mXVPWb/PYkL1uWQg7/p+I6OPjqcjOIUYE39Kz7tf73wfHuvs/uvv3P9H//d//E52W0VngtTXS2umR9tu2pbZtyRjT+b9xPnx8+qHjuJIvbznKv/Y9PUf4Xrk+a5qGmqYh89gks8fXkr9Txxtj68H9+5/o/v1Pg2NP/vo1ui1OLoOJStiNDU7AkgD9FNZOp8N3HblsgH+MMZ0xZlDpON7CQhEjhEsafch3XekdQwof0bERtW1LdGM7a+3xejf2+ENE/LcxpgvNF0RvPr57ZR6P90wOhVPQti2Zxyb5dTWhy3Xu3/9Edz/+0v/97u41ff7ydZbNoCGwq3GzG0yfzN7tPDQIY0x3EIXZ4/K58BKAFPjEYzA8OMy+0T4u0gsvpyHXUgRjTHdS/uIzon2lDSkLPZvoq+ht2x7zK22JIdLHx6YzT81kvqeWgPzjP97s65LHi0k9NHc+ojaSBj37qu9BLvheyeGuvFfmdlgn5wxRZf123XM+nnOpzdSQmMXv7sdf6N3da/r1/vfeG/z8Ze8F/vXkXVDaJgVQNhDuYbhhmceG/n6oPB8f+bP993KtR/r49ENnnpp9oztUAh3/aJpmkchq8fOJiYyH2OswwVnKx6cfjuJHRHRjO9lIOa2xaeEybBoaVHpZrjK/5nF/bz8+/dDJONH+GvNiQ1PC16dDdciyPPi7oSIZK75Exw7OsG3u/BfaHiPEmz8dlraz74XuBGUbKLHO0PWs/g9Pfib669f+/3d3r+nVyxcDj/Du+FkXIoKjAsjiJ4d7/FsWghTJUM9jDlwJjjZa53kpbg7bmMpX3/gf6CQ9TZNutkzmXVx/NK0hduVsImfP5QXK68trSxEkcY0YQrwtXfa+4H9/2o3tpjyzwcP6jjTktD2XY0fVONOWAl2fJKUXWOtO4q8n73bv7l53RER6MuTd3evo648KIPes2s0mIiIxy2Sv28FizMEQYeZMlMbnlUlPMGXPFFLB+g7gsemI2pMFqZxGnfY5wxJfo9OCOGd44jqXxVsd857vSIvX8+Ahzg9PfvYKjxZc13E9PDsR6UAPS6ahtO0Yjt798Hi2UItaY7imp0tY/Hyit3gI/PHph84+vBkUwumiyzf744/DiiEb6MenHxZPlWsB4comhlxElK4i6OuECJirnDidUhhje2wpfhrtnZvbdBV1zjV0Jxg6/HKJH9GwrLgMONTQhx4cs5ExZeASv1K253BYh9f/n8vW0U7eeN9cfML36uULIgqPBY56gE3TkBwaWc+QgI+17VCQzNjFI9FD0KZpyHJAOOOwm2i6kv39X2927AUSHYWOPeO5vagMQejseLFZAAATl0lEQVTgt7zex6cfOi6PAmFIL66OUnYecxuR7lyb5lR8pHClbKw1bfvQIpga7shyT3bM5a8n73auJS8sfnc//jKIBfJ3XNeaHALLSi1FRheKyxsRDX+RF8hxqjERTCm2c9BpdMXqlgjAUeCagU3+zSJYA2lfdoLaUwqpBzoP/njb8LwUjbSm7RCapulXHOS2y/dwbeLHsKCxEMp4YEws0CmAcrp9GNdqicg/jJON3j4sn5KXsMDo4+ylruFGSREkWi588nr9UFrMwupzZyY7KbJu6GdUl6YxdajjXGxLSogf0brFz8XcWKDzw6lFva6CCZmmTzkbmvKaqeE0pkqbr2zXlveYdLpeBDC1BKVEfn1pWENZp65XpW3k2h/HNRyeEj5Oi/MkrNQHucE7AbfHWjYIIzrDPUEAAG7wRp35QAABODNcmytBBOeBITAoDoa/fiBkYaTaVhYeICgOxG8PxK4+FyeAW69UW88/ADEkEcDa++tuOR6y9fwDsIRZArjGRqfTVCM9a+oIaqWldj0AIIZFe4K4RDBHfGduo+Lv5Yo5ua6/pgB/ibSsvQwAGCNqFjhUiJZU/tweRMqGOZbWEgJQ4n4sSQNEcJxL9padb9lOmN9Us8BBAjgn4XMSWLJCpGicITvI5SK2rJZ2aikpNUqIsZO6HEJsX7IAEqXRkdBrx8JpmRwCLx1+Eq3TE1g6TAsplzUNBdeUlhBSNJapPOcUoNzhF5AGrweYq3KsyRMhCq+gS9JXwtsMJWevPDcNTKk6t6a6dsleoI4L57r2HII9wNSszTP0eQkpb5i+Vmy+L7mRMLm9MdcmO6WBV7g+qi6EXmPDdi3xyWWj1lKdWrZlGsb+L2GzJmtzAraMUwBLVpY1Vcwa1BSjNYgg6lpeEeTNxiG0booPgX3kjDuGUtv+1thyeU9tDq/PDSXXftyXymoEcOvUmqVd26QUOMV1j/RWqUTuXerWwhocHBerEsC1FhIAOUjR6Z1uVTsPn8jy39baHdF+uwz+O/Z6a2RVAki0bRH0NYgtlwlwwxtmGSIyt22/FzPj2oFvjijZ4yZcnbV2d9iSM/veJKVY5euwzqX3KEmpMvn49EP38emHbmpjLLAOeBvSfgfGAyxcc+A6QHTcHMpet0Q3tjOP++1O7XUbtBHa2nF6gCU9Dl/DLrF4Vduo6WmFCFzK9Gl7XJm1FyGHOznKB95tPGPCw8Pg/T7Zb5LYY9FjMTSPzWGv6iSXr4p3COxrILwJNhfIIDZwOJbDNY5ZyLpkJmwqFsL5P9jp886f5X5ums/le0CfzOI8yoA60bERHfYi7niT7I/0geg/7PGLn8yObmzvKYTmn0UPnn488l41TTMQvKY5dmBL4oGavdg1/e9LIigGqAq9Y/daxgPksY+P+828c0zH//Dk533jDwjELsHXyw6OHxq/pb0A/Pf/e9P9N73Jvql0L34iDXof29Dy17OJ3Ltr+o3ZBcaYjuSQ6LHpzFMzaXNqCcjU/sCp773zSaCRNOjZ1zmd0Bz4XsmJD3mvzK1I0+F+xNZDWb9d95yPX8pSm0kB1D0OZ157ex8f98K49xb23z2cG30TptJDREQ3tuNKoGfClt4cLX6+no+HBkR74ZfnfHz6IWm+5XV1fEc2Uk5rbE/NZdg0w3iSXFoh88v3/uPTD4O40MFbnJX3KeHr06Hik7I8+phVoEjGii/RcJjJsbEUtscIibedLoOZ3/50JyjbwKWIH9GEALL4ySER/3YVguyVcrjKMk61v37rPC/FzZFu/9DmkL7xP9BJepom3WyZJ0Y3mtYQu3I2kbPn8gLl9eW1pQiSuEYMId6WLnvphcmG3592Y7spz2zwsL4jDTltz+XYUTXOtKVA1yfJpQgfMyqA3LNqN5uIiK5bov/5MDhXLsgcDBPEeXPxeWVH8UnbM4VUMOn9ErUnC1I5jTrtc4YlvkanBXHO8MR1Lou3OuY935EWr+cRIjxacF3H9fDsRKRD3/Qj0lDadgxH7354PJco6ZHVpYkf0YgAfnz6obMPbwaFcLro8jjLJL0G3UhTDwe5sokhFxGlqwj6OiEC5ionTqcUxtgeW09QSLR3bm7TVdQ519AdYOjwyyV+RMOy4jLgUEMfenA8/RBTBi7xK2V7DnI2liif+B3tXE68z8WoB9g0TT+7RERkJ2aYemESDd2kSefJELRpGrIcEM48OzV18//+rzc79gKJjkLHXvHcXlSGIHTwW17v49MPHZdHxmKYxNVR6hn0OdfVHWvTnIqPFK6UjbWmbR9aBFPDHdklTXb4mBwCy0otRcZVKC6PRDT+RV6gHN7JYyyCqYR2LhxLc8VPlnqo/XBf5V/H4XJ2AmNI+7ID1J5SSB3QefDH24bnpWikNW2H0DQNkRC/rJ7mw+UOeyVOAZTT7cO4VktE48M42fAHK9RnTsszLDD6OHupa7hRUgSJlgufvF4/lBazsPrcmclOiqwb+hnVpWlMHeo4F9uSEuJHtA3xI/K8En/qMShfwYRM1S8t1KUTCiWQi8ZTXk+ztrwvTefUEpQS+fWlYQ1lvbRehSxS57afe53tUlK9Eh8AAAAAAAAAAAAAgC1gjNns689W+T5AAMCRuQIV8x173UadfylAAAFYMfyaORaoUJHqX083cb78fIsiCAEEYKWwiDFSCIO+zy8ynThfPlmyNRGEAAJwJsQ8/jZ4IGFjohYDBBCAFSMfwdNvYfdyeD9h24Y/Mzz2ggcAACjOYQvKwU+IJ2eM6ejmcO7N9Hfm2rkE4AECsFKstbu5L7jg13uFeIxL7KyFt/Sse0vPokUbAgjAGRH6jK7vHZJj150ttpXXEb6lZ92rly/o1csXFCuCEEAAVowUJtcGRb7vEB1eSRbxUgO2NUcIY5fppILFj4kVQQggACtnjndmjNnNeaNL7HdY8OTGWKVEcM6QVwMBnIB7ta0EhX2gHOpird3lfAu0thVynjGmf1clUdwynaVo8fv85eus6wTtC7xV+AYT9Xvmzt6P+DDTtup3rPmQ5UC0f7PzueblnClZ5gETJ70Aybd/p4RF7jf6cyf/J9oPdYn2wvf5y1eSw+Bf738nunvd8ffGgAB60I1+ETe2O2yeflbCwd6eLgd73RJ9CtuEYPCoVUjePRu9u8hWliNpOOT9bO5hLvS2D0zQOsUAZGzv7ZevHdFB2Ijo/v1P/XmvXr6gz1++0t2Pv8yyEySALAbmlmbd/CzeT+Deq3PecKsfQSLi1/u3wQ1fXmcQH0kpgje2S1XhNH25qY2diA6VPOJaYjP18bw7hMe1QDfrkg2RBq/tM/bmU3GIS/adW+ym8DGw8OVgMgYoPSH7QPsKcmPD4kCHRZjJA6OB9vWD5DHfIRrOujVNMyvGob+Toix4geuSa4QgOwEui1Dx4Xhh8CNZI+In7RPFL/EIxiF+xWyfIdbanf5Jde3f6M8dD2/H4M+lV/ju7jWFDH+JIofAXBHMY+PtBQdDHnE8hfdzGos6eil9uk5tLvK+DrG/2T1bv7mUalRLOXol+/13iYblkLIyctpDllXI+y87ztAlHD7bKYgdjte0DfYi+Jaede/uXk+e8/nLV/p8OC9U/Ig8myJJBsNfjWsIeuhF5d7AqRqmKy6n0yU3aJ9rf+AFznTtdVpZBOdca+rafP3B/wlEUA7hieJieERq2BzSkUx5gfL4jLzp++q8hs8LLGEbFGdyCBy7Bsk8Nn3FF57XzOTNS4tL+GLtmMdmkfjJxsPD51TDBF0Oc72rEDuxZdCfr+JmQY3+0KFq4eGfRd6YChl4h+MiDQPb1u64PmezDYozf2LAMwGhZw7lsDlVr6eXp/THRWOVnmvOAK0T5cnksuv1zivPUurGvQZvR09IEZXzxGraBuNkuwE5G4Gv95Q2thJzkbO1RFRd/NaC7LD1Bu25RaimbRAHbgC4WPpVAJ4lNDk9c6JDCKiwbRAHbgK4WEJGCpdoGwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAChM7t34trzbH7bFBGDF6G0dcgnVVt9RiAezAVgprs25iNK/W5Nou6/pggcIwJmQa+PxwbYHG/MEIYAArBj5PkH9VmmwHGyMDsDKGb5U9bDLXvj21GE2xBusc267vDY2M9YH4Bw53Qq2IaL0W0zoXQZDtkC9BDAEBuBCMfu9uztrbUc31juDHLvzIwAAFIOFLPRc/rHWdvL/qWU0UjC3NBECAFg5wYJ0Ywcixn/3ojbiCbKduesNQz3ONYFJkAm2sr0mWDdxG9O3J8ebpiHnHtIOO7HCJfcC56G0EZ+h3VRG90y5v7c2LiUfYJqBB3ezv9/SAwwVt1IeZ22yeICujaHNbZ1V5jzDNeiZePX7SFpcM2PnyNz8V+Mg0CGLfrOlfyQN9rpd9ebzskzMY9PZ66PXZyi8zEp5nLVJeiP1YzX9cVWRllRc3Zv4rqXP00sJ+kWlju+7NtQ+HI9OtxRSc0tJG48sb52XJflPiewM+0W8vjJwCI/uSInyLAVxpaG47TNFt3sur3Moq/nLYG5OZ5jatqW2HQqHedz3BNwAUzxqww+HE/mDtvb6aFM3/jHPbtBgRe81Z5mA9L6apiHz2CR9oL1/SN7jqczJfwp0nZBp8pbBiPgRDe9FtvQ7xK+Y7TPGWruz1u743pnbY5mtWfyIIofAzt6c6MRTcpHSJT7aOw7tDmnp+gb02PQr2vub8XAM1IYOB2KH7rpha8ER3tei4LAxpmtFORyuPbg/KfIfkg5pk5EetH04poHth5ZB6ke/rLVd6D3NYZuoXjgoN9baHX06PqJiK6YllFlDOtdx12p1omFDSOESu2JzWlRdw8GYt124GnWMAHKeXeLHncDSBuCLUcqyYBux+Y9Nh/xfCsZgJMBxqMeRMpjyAheGUqy1nfbkT67h8wJlmiLt6jjsqH1QlCwNgW+qfp1PqsanG/+UAM61wX/HXMsnCKnjInLpweC4QwCX2IlN01jcjNM6WgYTExCxHVL/3YP4yTR445EuIbZ218+gR8Rxpfi5RgJrnlDZAmdb+CeTC3x8ZUOLnN4XX5+ITsILc4UiVXo0pd83J9MhRU+KUepJqRDb8u9c9kE4Z1v4YxMJaxJAUAdX/Ri+8aTZ/52hrkzZJjqPGdItgMIHl8tITDG7JxoQz4T4AQAAAAAAAAAAAAAAAAAAAAAAAAAAABLgXIf0w5OfCyfjPPjHXz8HnYfyAzGE1qvaLK3XrnyOXXNOuYSm8VzKHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA506qfaWn4G08L5n5G6MDAIpTSvyIyLmNZwne0rNieYQAAnBGtG2731FuRAhTimRJwSU6it8/X74sYneWAJYuFKf9m8t3z31sPf9bpt9N7rola21njBn89JsxJWij/bazxnRsy1rb/730+mN8/vK1qCc4ii7kNQjgGtJRi63nf8tIoeuF6PC3FMQUtvQ1XUKbg7f0rPvny5ddd/9H/zuXrSCk8ltr+wJfQ3q26AmtIf8Q4Tq4xIgFKfn9GBHZZDYULH5yCLwaEdQNr4YISnec/y4pArVnxmrnX6ejdnnUYC3Cn3tkJq/b17Ob/AJYcugbvTGzzry9bsk+EBljimzyzPattbupG5Fj42ljTNe2LZlbIvpUJs/aPv/N+TtU0KJp0cLXNI2MGRVJy6EjqLK5eE3bpeC6TiRijxXrXA6iJ0GstTudcXNb1jMaK3i+YSVuTg3vh8v/JH+FhiiMuT3+zeLHxwrXhWqe2KV7vwcnY2eM2fHss/ysXspWgnaNL71CEA2D0N6h5wbKQpbBZHlkTEPtEMCWYtCXXqejWdvscBWU57WFRqHjkDXuv3M2dAO2t8ZbetZ19390pWODQejZ4c1WBOEJXXoZ6Hte697rAH3f+Vy47a3Bwtfd/1F/JlgC8XOzpXLQjT5b3lUH4/NAs4YeRBqK2944LIKr8wCJ1rMkAGyHk3WQQphqCFFN2wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAGYKtLgAA2+Xm8jc7+7faCQAABHJTdhdG89jsf1+wCAYL4JoKgbchrJ2OWmw9/1umaRoiIrLXLTm350xI27YpL7dKggSwL9gVNTrz2Gx6S07Of+10gHKwR8YiyNjrltq2zSJYfM1Nb/epe5naDU/uC1syLXIT7FI2femouSH9Gspgq7jaIt+P5HXhRtQx8fdadCAFu9ATdWattcHfTYkxpmvblsztIR0P+x6xRHrYdj8MWVEZGGOKpWWs4pcsk0NHUPweyPzXqgM6HUzK9Mjrc32zD/v/a7eBKrDqs/dROz1E1M9U6d4pl60+7xVnyHweWMmeWdYF/l26TGp5wLVtl0KPNLJ5mufC6sRPkXtYKBs9i2EOO6Hp0MeLzhA6xK903agZBqhpuwZrbvegIIM4oMP7rJ2+EsiYUO101PLGa9quRe37DVaCHGrW8n5qIvNdOx06OF/KrrZdwi5Iz6yF0HIovKWGL+FlBxwMNrenyxMuEZ6AIdoHxGsNBdkeLw0hKr9uTdreYhsAtO3YwJbzTnTa6HNOPvFQU0++6KUg2cTYE/KANwgAKMpgMk4JU43Y5BomxgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAC2xv8HFJGP1C1M2PwAAAAASUVORK5CYII=";
			this.sprite = document.createElement("canvas");
			this.sprite.ctx=this.sprite.getContext('2d');
			this.sprite.larg=32;
			this.sprite.alt=32;
			this.stance = [0, 0]; //colonna, riga (x,y)
      			this.sprite.timer = 0;
      			this.lifeMax = 16;
      			for (i = 0; i < 8; i++) {
      				if (heartAcquired[i]) {
      					this.lifeMax += 2;
      				}
      			} //aumenta la vita massima di 2 per ogni cuore trovato
      			this.life = this.lifeMax;
      			this.x = 0;
      			this.y = 0;
      			this.yv = 0;
      			this.xv = 0;
      			this.slope = 0;
      			this.width = 40;
      			this.height = 46;
      			this.color1 = '#0040f0';
      			this.color2 = '#f0f0f0';
      			this.defaultColor1 = '#0040f0';
      			this.defaultColor2 = '#f0f0f0';
      			this.charge0color = '#ffc000';
      			this.charge1color = '#49ff37';
      			this.charge2color = '#14dfff';
      			this.charge3color = '#ff3788';
      			this.speed = 0.9;
			this.attackTimer=0;
			this.attackTimerMax=10;
      			this.defaultspeed = 0.9;
      			this.jumpheight = 13.5;
      			this.giasaltato = false;
      			this.giasparato = false;
      			this.facingRight = true;
      			this.isInWater = false;
			this.touchingWall=false;
      			this.invulnerability = 0;
      			this.canMove = true;
      			this.canChangeWeap = true;
      			this.carica = 0;
      			this.activePower = 0;
      			this.activeShot = 0;
      			this.power = [ //vettore dei poteri
      				{
      					usageMax: 28,
      					usage: 28,
      					color1: '#687968',
      					color2: '#d9b289',
      					nome: 'Homing Torpedo'
      				},
      				{
      					usageMax: 28,
      					usage: 28,
      					color1: '#1a914f',
      					color2: '#60d1aa',
      					nome: 'Chameleon Sting'
      				},
      				{
      					usageMax: 28,
      					usage: 28,
      					color1: '#e13e60',
      					color2: '#a1c1aa',
      					nome: 'Rolling Shield'
      				},
      				{
      					usageMax: 28,
      					usage: 28,
      					color1: '#f14f02',
      					color2: '#f8e179',
      					nome: 'Fire Wave'
      				},
      				{
      					usageMax: 28,
      					usage: 28,
      					color1: '#e40097',
      					color2: '#e191c1',
      					nome: 'Storm Tornado'
      				},
      				{
      					usageMax: 28,
      					usage: 28,
      					color1: '#f8b202',
      					color2: '#a1a1a1',
      					nome: 'Electric Spark'
      				},
      				{
      					usageMax: 28,
      					usage: 28,
      					color1: '#606081',
      					color2: '#81aa89',
      					nome: 'Boomerang Cutter'
      				},
      				{
      					usageMax: 28,
      					usage: 28,
      					color1: '#35e1f8',
      					color2: '#f8e14f',
      					nome: 'Shotgun Ice'
      				},
      			];
			this.getHit = function(damage, ignoreInvulnerability){
      				if (this.invulnerability < 1 || ignoreInvulnerability) { //entity collison								            		
      					if (armaturaAcquired[3] && (damage > 1)) {
      						this.life = this.life - (damage - 1);
	      				} else {
      						this.life = this.life - damage;
      					}
      					this.invulnerability = 40;
      					this.canMove = false;
      				}
			}
      			this.disegnaPlayer = function (xdisegnata, ydisegnata) {
				xdisegnata-=12; ydisegnata-=17; //allinea sprite
      				if ((this.facingRight && !(this.touchingWall && Math.round(this.yv)>0)) || (!this.facingRight && (this.touchingWall && Math.round(this.yv)>0))) {
      					ctx.drawImage(this.sprite, this.sprite.larg*this.stance[0], this.sprite.alt*this.stance[1], this.sprite.larg, this.sprite.alt, xdisegnata, ydisegnata, this.sprite.larg*2, this.sprite.alt*2);
      				} else {
      					ctx.save(); //salvo il canvas attuale
      					ctx.scale(-1, 1); //flippa il canvas per fare lo sprite mirrorato
      					ctx.drawImage(this.sprite, this.sprite.larg*this.stance[0], this.sprite.alt*this.stance[1], this.sprite.larg, this.sprite.alt, -xdisegnata, ydisegnata, -this.sprite.larg*2, this.sprite.alt*2);
      					ctx.restore(); //faccio tornare come prima al punto di save() altrimenti rimane buggato
      				}
				xdisegnata+=12; ydisegnata+=17; //ricorrezione allineamento
				if (this.carica > 80) { //level 2 charge and 3
      					if (this.carica > 150 && armaturaAcquired[2]) { //charge 3 - richiede armaturaAcquired[2]
      						var xdisegnata = xDisegnata();
      						var ydisegnata = yDisegnata();
      						var xrandom = ((-this.width / 4) + Math.floor(Math.random() * (this.width / 2))) * 3;
      						var yrandom = ((-this.height / 4) + Math.floor(Math.random() * (this.height / 2))) * 2;
      						ctx.fillStyle = this.charge3color;
      						ctx.fillRect(xdisegnata + (this.width / 2) + xrandom, ydisegnata + (this.height / 2) + yrandom, 8, 8);
      					} else { //charge 2
      						var xdisegnata = xDisegnata();
      						var ydisegnata = yDisegnata();
      						var xrandom = ((-this.width / 4) + Math.floor(Math.random() * (this.width / 2))) * 3;
      						var yrandom = ((-this.height / 4) + Math.floor(Math.random() * (this.height / 2))) * 2;
      						ctx.fillStyle = this.charge0color;
      						ctx.fillRect(xdisegnata + (this.width / 2) + xrandom, ydisegnata + (this.height / 2) + yrandom, 8, 8);
      					}
      				} else if (this.carica > 25) { //level 1 charge
      					var xdisegnata = xDisegnata();
      					var ydisegnata = yDisegnata();
      					var xrandom = ((-this.width / 4) + Math.floor(Math.random() * (this.width / 2))) * 3;
      					var yrandom = ((-this.height / 4) + Math.floor(Math.random() * (this.height / 2))) * 2;
      					ctx.fillStyle = this.charge1color;
      					ctx.fillRect(xdisegnata + (this.width / 2) + xrandom, ydisegnata + (this.height / 2) + yrandom, 8, 8);
      				}
				if(debugMode){ctx.fillStyle="#00ff0080"; ctx.fillRect(xdisegnata, ydisegnata, this.width, this.height);} //hitbox
				if(this.stance[0]==9){alert();}
      			}
      			this.physics = function () { //this function handles the platformer physics - in realta' solo del player
      				var gravityApplicata = 0;
      				var frizioneApplicata = 0;
      				if (this.y > level.waterLevel) { //determina se sei in acqua o no
      					if (!this.isInWater) {
      						this.isInWater = true;
      						this.yv = 0;
      					}
      					gravityApplicata = level.gravityWater;
      					frizioneApplicata = level.frictionWater;
      				} else {
      					this.isInWater = false;
      					gravityApplicata = level.gravity;
      					frizioneApplicata = level.friction;
      				}

      				this.yv += gravityApplicata; //get level gravity
      				this.y += this.yv; //apply gravity
				this.touchingWall=false; //resetta ad ogni chiamata di physics()

      				for (var i = 0; i < level.length; i++) { //y collision con level
      					if (collisionBetween(this, level[i])) {
      						this.y += -this.yv;
      						this.yv = 0;
      						if (keys[dashkey] && this.canMove && armaturaAcquired[1]) { //dash
      							this.speed = this.defaultspeed * 2.25;
      						} else {
      							this.speed = this.defaultspeed;
      						}
      						if (keys[jumpkey] && this.canMove) { //jump
      							if (!this.giasaltato) {
      								this.yv = -this.jumpheight;
      								this.giasaltato = true;
      							} else {
      								this.yv = 0;
      							}
      						} else {
      							this.giasaltato = false;
      						}
      					}
      				}

      				for (var i = 0; i < entity.length; i++) { //y collision con entity (piattaforma e ostacolo)
      					if (entity[i].life > 0 && entity[i].type == "platform" && !entity[i].disabled) {
      						if (collisionBetween(this, entity[i])) {
      							if (((this.y + this.height) > entity[i].y) && ((this.y + this.height) < entity[i].y + 19)) { //collisione con y
      								this.y = entity[i].y - this.height;
								if(entity[i].yv){this.yv = entity[i].yv * 1.1;}else{this.yv=0;}
      								if (keys[dashkey] && this.canMove && armaturaAcquired[1]) { //dash
      									this.speed = this.defaultspeed * 2.25;
      								} else {
      									this.speed = this.defaultspeed;
      								}
      								if (keys[jumpkey] && this.canMove) { //jump
      									if (!this.giasaltato) {
      										this.yv = -this.jumpheight;
      										this.giasaltato = true;
      									} else {
      										this.yv = 0;
      									}
      								} else {
      									this.giasaltato = false;
      								}
								if(entity[i].name=="thin platform" && keys[giukey] && keys[jumpkey]){
									this.y=Math.ceil(this.y)+1; //salta giu dalla platform
									this.yv=1;
								}
      								if(entity[i].speed){ //se l'entita si muove, il player si muove con essa
      									this.xv += entity[i].xv;
      									if (entity[i].xv > 0) {
      										if (this.xv > entity[i].xv) {
      											this.xv = entity[i].xv / 1.85;
      										}
      									} else {
      										if (this.xv < entity[i].xv) {
      											this.xv = entity[i].xv / 1.85;
      										}
      									}
      									this.x -= this.xv;
      									for (var j = 0; j < level.length; j++) {
      										if (collisionBetween(this, level[j])) {
      											this.x += this.xv * 2;
      										}
      									}
      								}
      							} else { //collisione con x
      								this.y += this.slope;
      								this.x -= -this.xv;
      								if (keys[dashkey] && this.canMove && armaturaAcquired[1]) { //wall dash
      									this.speed = this.defaultspeed * 2.25;
      								} else {
      									this.speed = this.defaultspeed;
      								}
      								if (keys[jumpkey] && this.canMove) { //wall jumping
      									if (!this.giasaltato) {
      										this.yv = -this.jumpheight + 1;
      										if (this.xv > 0) {
      											this.xv = -9.9;
      										} else {
      											this.xv = 9.9;
      										}
      										this.giasaltato = true;
      									} else {
      										this.xv = 0;
      									}
      								} else {
									this.touchingWall=true;
									this.yv=this.yv/1.2;
      									this.xv = 0;
      									this.giasaltato = false;
      								}
      							}
      						}
      					} else if(entity[i].life > 0 && !(entity[i].type == "sparoDelPlayer")){ //entita che fa danno
      						if (collisionBetween(this, entity[i])) {
      							if (entity[i].damage > 0) {
								this.getHit(entity[i].damage);
								break;
      							} else { //qui stiamo parlando delle entita' con danno<1, praticamente i pickup (se hanno il danno in negativo restituiscono la vita a X)
      								if ((this.life - entity[i].damage) > this.lifeMax) {
      									var vitaRecuperabile = (0 - entity[i].damage) - (this.lifeMax - this.life);
      									this.life = this.lifeMax;
      									for (j = 0; j < 4; j++) { //qui inizia a riempire le subtank
      										if (subtank[j].acquired) {
      											if ((subtank[j].life + vitaRecuperabile) > subtank[j].lifeMax) {
      												vitaRecuperabile = vitaRecuperabile - (subtank[j].lifeMax - subtank[j].life);
      												subtank[j].life = subtank[j].lifeMax;
      												i++;
      											} else {
      												subtank[j].life = subtank[j].life + vitaRecuperabile;
      												break;
      											}
      										}
      									}
      								} else {
      									this.life = this.life - entity[i].damage;
      								}
      							}
      						}
      					}
      				}

      				if (keys[destrakey] && this.canMove) { //x movement
      					this.xv -= this.speed;
      					this.facingRight = true;
      				}
      				if (keys[sinistrakey] && this.canMove) {
      					this.xv += this.speed;
      					this.facingRight = false;
      				}
      				this.xv *= frizioneApplicata;
      				this.x += -this.xv;

      				this.slope = 0; //serve per i bordi tipo - serve anche per le collision
      				for (var i = 0; i < level.length; i++) {
      					if (collisionBetween(this, level[i])) {
      						if (this.slope != -8) {
      							this.y -= 1;
      							this.slope += 1;
      						}
      					}
      				}
      				for (var i = 0; i < level.length; i++) { //x collision
      					if (collisionBetween(this, level[i])) {
      						this.y += this.slope;
      						this.x -= -this.xv;
      						if (keys[dashkey] && this.canMove && armaturaAcquired[1]) { //wall dash
      							this.speed = this.defaultspeed * 2.25;
      						} else {
      							this.speed = this.defaultspeed;
      						}
      						if (keys[jumpkey] && this.canMove) { //wall jumping
      							if (!this.giasaltato) {
      								this.yv = -this.jumpheight + 1;
      								if (this.xv > 0) {
      									this.xv = -9.9;
      								} else {
      									this.xv = 9.9;
      								}
      								this.giasaltato = true;
      							} else {
      								this.xv = 0;
      							}
      						} else {
							this.touchingWall=true;
							this.yv=this.yv/1.2;
      							this.xv = 0;
      							this.giasaltato = false;
      						}
      					}
      				}

				var shootingRight=this.facingRight;
				if(this.touchingWall && Math.round(this.yv)>0){ shootingRight=!this.facingRight;} //cambia direzione dei colpi quando attaccato al muro

      				if (keys[lkey] && !tastoGiaSchiacciato && this.canMove && this.canChangeWeap) { //previous available power
      					tastoGiaSchiacciato = true;
      					for (i = this.activePower - 1;; i--) {
      						if (i == -1) {
      							i = 8;
      						} else if (i == 0) {
      							this.activePower = 0;
      							break;
      						}
      						if (levelDefeated[i - 1]) {
      							this.activePower = i;
      							break;
      						}
      					}
      					this.calcolaPlayerColor();
      				}

      				if (keys[rkey] && !tastoGiaSchiacciato && this.canMove && this.canChangeWeap) { //next available power
      					tastoGiaSchiacciato = true;
      					for (i = this.activePower + 1;; i++) {
      						if (i == 9) {
      							this.activePower = 0;
      							break;
      						} else if (levelDefeated[i - 1]) {
      							this.activePower = i;
      							break;
      						}
      					}
      					this.calcolaPlayerColor();
      				}

      				if (keys[sparokey] && this.canMove) { //shooting
      					if (!this.giasparato) {
      						if (this.activeShot < 3) { //se non ci sono piu di 3 colpi attivi contemporaneamente        
							this.attackTimer=this.attackTimerMax;
      							this.giasparato = true;
      							if (this.activePower == 0) {
      								var sparo = new newSparo(20, 10);
      								entity.push(sparo);
      								this.activeShot++;
      							} else {
      								if (this.power[this.activePower - 1].usage > 0) {
      									switch (this.activePower) {
      										/*HomingTorpedo*/
      										case 1:
      											var sparo = new newHomingMissle(12, 12, this.power[0].color1, this.power[0].color2, 1.5);
      											entity.push(sparo);
      											this.activeShot = this.activeShot + 1.5;
      											this.power[this.activePower - 1].usage -= 0.5;
      											break;
      											/*ChameleonSting*/
      										case 2:
      											var sparo = new newChameleonSting(15, 15);
      											entity.push(sparo);
      											this.activeShot = this.activeShot + 3;
      											this.power[this.activePower - 1].usage -= 0.5;
      											break;
      											/*RollingShield*/
      										case 3:
      											var sparo = new newRollingShield(40, 40);
      											entity.push(sparo);
      											this.activeShot = this.activeShot + 3;
      											this.power[this.activePower - 1].usage -= 1;
      											break;
      											/*Fire*/
      										case 4:
      											var sparo = new newFireWave(70, 10);
      											entity.push(sparo);
      											this.activeShot = this.activeShot + 3;
      											this.power[this.activePower - 1].usage -= 1;
      											break;
      											/*Storm*/
      										case 5:
      											var sparo = new newStormTornado(this.x, (this.y + 3 + (15 / 2)), 15, 15, 0, shootingRight, true);
      											entity.push(sparo);
      											this.activeShot = this.activeShot + 3;
      											this.power[this.activePower - 1].usage -= 1;
      											break;
      											/*Electric*/
      										case 6:
      											var sparo = new newElectricSpark(15, 15);
      											entity.push(sparo);
      											this.activeShot = this.activeShot + 1;
      											this.power[this.activePower - 1].usage -= 1;
      											break;
      											/*Boomerang*/
      										case 7:
      											var sparo = new newBoomerangCutter(15, 15, true);
      											entity.push(sparo);
      											this.activeShot = this.activeShot + 1;
      											this.power[this.activePower - 1].usage -= 1;
      											break;
      											/*ShotgunIce*/
      										case 8:
      											var sparo = new newShotgunIce(this.x + this.width + 6, this.x - 6 - 15, this.y + 6, 15, 15, true, 2.5, 0, shootingRight);
      											entity.push(sparo);
      											this.activeShot = this.activeShot + 3;
      											this.power[this.activePower - 1].usage -= 1;
      											break;
      									}
      								}
      							}
      						}
      					} else {
      						if (this.activePower == 0 || armaturaAcquired[2]) {
      							this.carica++; 
      						}
      					}
      				} else {
      					if (this.giasparato) {
      						if (this.canMove) {
      							if (this.activeShot < 3) { //se non ci sono piu di 3 colpi attivi contemporaneamente        
								this.attackTimer=this.attackTimerMax;
      								if (this.activePower == 0) { //default power
      									if (this.carica > 80) {
      										this.activeShot++;
      										if (this.carica > 150 && armaturaAcquired[2]) { //charge 3 shoot
      											var latoCubottiSparo = 15;
      											if (shootingRight) {
      												var sparo = new newSparoCharge3((this.x + this.width + 6), (this.y + 3 + (latoCubottiSparo / 2)), latoCubottiSparo, latoCubottiSparo, 0, shootingRight, true);
      												var sparoInvisibile = new newSparo(1, 55); //gestisce activeShot per lo sparoCharge3
      												sparoInvisibile.x = (this.x + this.width + 6);
      											} else {
      												var sparo = new newSparoCharge3((this.x - 6 - latoCubottiSparo), (this.y + 3 + (latoCubottiSparo / 2)), latoCubottiSparo, latoCubottiSparo, 0, shootingRight, true);
      												var sparoInvisibile = new newSparo(1, 55);
      												sparoInvisibile.x = (this.x - 6 - latoCubottiSparo);
      											}
      											sparo.color = this.charge3color;
      											sparoInvisibile.color = "#00000000"; //sono 8 zeri invece che 6, gli ultimi due indicano il canale alpha(trasparenza)
      											sparoInvisibile.damage = sparo.damage;
      											sparoInvisibile.speed = sparo.speed;
      											sparoInvisibile.y = sparo.startingY - 20;
      											sparoInvisibile.canPassWall = true;
      											entity.push(sparo);
      											entity.push(sparoInvisibile);
      											var latoCubottiSparo = 15;
      											if (shootingRight) {
      												var sparo = new newSparoCharge3((this.x + this.width + 6), (this.y + 3 + (latoCubottiSparo / 2)), latoCubottiSparo, latoCubottiSparo, 0, shootingRight, false);
      											} else {
      												var sparo = new newSparoCharge3((this.x - 6 - latoCubottiSparo), (this.y + 3 + (latoCubottiSparo / 2)), latoCubottiSparo, latoCubottiSparo, 0, shootingRight, false);
      											}
      											sparo.color = this.charge3color;
      											entity.push(sparo);
      										} else { //charge 2 shoot
      											var sparo = new newSparo(50, 25);
      											sparo.y = sparo.y - 7;
      											sparo.color = this.charge2color;
      											sparo.damage = 3;
      											sparo.perforation = true;
      											entity.push(sparo);
      										}
      									} else if (this.carica > 25) { //charge 1 shoot
      										this.activeShot++;
      										var sparo = new newSparo(35, 15);
      										sparo.y = sparo.y - 2;
      										sparo.damage = 2;
      										sparo.color = this.charge1color;
      										entity.push(sparo);
      									}
      									this.carica = 0;
      									this.giasparato = false;
      								} else {
      									if (this.carica > 150 && armaturaAcquired[2]) {
      										switch (this.activePower) { //poteri caricati
      											/*HomingTorpedo*/
      											case 1:
      												if (this.power[this.activePower - 1].usage > 2) {
      													var sparo = new newHomingMissle(18, 18, "#3d85c6", "#fa8cff", 3);
      													sparo.damage = 2;
      													entity.push(sparo);
      													this.activeShot = this.activeShot + 3;
      													var sparo = new newHomingMissle(18, 18, "#3d85c6", "#fa8cff", 0);
      													sparo.y += -15;
      													sparo.damage = 2;
      													entity.push(sparo);
      													var sparo = new newHomingMissle(18, 18, "#3d85c6", "#fa8cff", 0);
      													sparo.y += 15;
      													sparo.damage = 2;
      													entity.push(sparo);
      													var sparo = new newHomingMissle(18, 18, "#3d85c6", "#fa8cff", 0);
      													sparo.y += -30;
      													sparo.damage = 2;
      													entity.push(sparo);
      													this.power[this.activePower - 1].usage -= 3;
      												}
      												break;
      												/*ChameleonSting*/
      											case 2:
      												if (this.power[this.activePower - 1].usage > 3.5 && this.invulnerability < 90000) {
      													this.invulnerability = 91000;
      													this.canChangeWeap = false;
      													this.power[this.activePower - 1].usage -= 4;
      												}
      												break;
      												/*RollingShield*/
      											case 3:
      												if (this.power[this.activePower - 1].usage > 1) {
      													this.power[this.activePower - 1].usage -= 2;
      													this.canChangeWeap = false;
      													var sparo = new newRollingShieldCharge3(100, 100);
      													entity.push(sparo);
      													this.activeShot = this.activeShot + 3;
      												}
      												break;
      												/*FireWave*/
      											case 4:
      												if (this.power[this.activePower - 1].usage > 2) {
      													var sparo = new newFireWaveCharge3Main(20, 20);
      													entity.push(sparo);
      													this.activeShot = this.activeShot + 3;
      													this.power[this.activePower - 1].usage -= 3;
      												}
      												break;
      												/*StormTornado*/
      											case 5:
      												if (this.power[this.activePower - 1].usage > 1) {
      													this.power[this.activePower - 1].usage -= 2;
      													var sparo = new newStormTornadoCharge3(this.x, this.y + 6, 60, 15, shootingRight, 0, true);
      													entity.push(sparo);
      													this.activeShot = this.activeShot + 3;
      												}
      												break;
      												/*ElectricSpark*/
      											case 6:
      												if (this.power[this.activePower - 1].usage > 1) {
      													this.activeShot = this.activeShot + 3;
      													if (shootingRight) {
      														var sparo = new newElectricSparkCharge3(this.x + this.width + 6, this.y + 9, 16, 100, shootingRight);
      														entity.push(sparo);
      														var sparo = new newElectricSparkCharge3(this.x + this.width + 6, this.y + 9, 16, 100, !shootingRight);
      														entity.push(sparo);
      													} else {
      														var sparo = new newElectricSparkCharge3(this.x - 6 - 16, this.y + 9, 16, 100, shootingRight);
      														entity.push(sparo);
      														var sparo = new newElectricSparkCharge3(this.x - 6 - 16, this.y + 9, 16, 100, !shootingRight);
      														entity.push(sparo);
      													}
      													this.power[this.activePower - 1].usage -= 2;
      												}
      												break;
      												/*BoomerangCut*/
      											case 7:
      												if (this.power[this.activePower - 1].usage > 1) {
      													this.power[this.activePower - 1].usage -= 2;
      													this.activeShot = this.activeShot + 3;
      													var sparo = new newBoomerangCutterCharge3(30, 30, 0, true);
      													entity.push(sparo);
      													var sparo = new newBoomerangCutterCharge3(30, 30, 1, false);
      													entity.push(sparo);
      													var sparo = new newBoomerangCutterCharge3(30, 30, 2, true);
      													entity.push(sparo);
      													var sparo = new newBoomerangCutterCharge3(30, 30, 3, false);
      													entity.push(sparo);
      												}
      												break;
      												/*ShotgunIce*/
      											case 8:
      												if (this.power[this.activePower - 1].usage > 1) {
      													var sparo = new newShotgunIceCharge3(60, 20);
      													entity.push(sparo);
      													this.activeShot = this.activeShot + 3;
      													this.power[this.activePower - 1].usage -= 2;
      												}
      												break;
      										}
      									}
      									this.giasparato = false;
      									this.carica = 0;
      								}
      							} else {
      								this.carica = 0;
      							}
      						} else {
      							this.carica = -9999999999999;
      						}
      					}
      				}

      				if (this.invulnerability > 0) { //se l'invulnerabilita' e' >=1 la riduce e colora x in base a che punto e'
      					this.invulnerability--;
      					if (this.invulnerability == 90000) {
      						this.invulnerability = 5;
      						this.canChangeWeap = true;
      					} //fine sting cham charge3
      					if (this.invulnerability > 90000) { //potere di sting chameleon charge3
      						this.calcolaPlayerColor();
      					}
      					if (this.invulnerability < 30) {
      						this.calcolaPlayerColor();
      						this.color1 = this.color2;
      						this.color2 = this.color2;
      					}
      					if (this.invulnerability < 20) {
      						this.canMove = true;
      					}
      					if (this.invulnerability < 5) {
      						this.calcolaPlayerColor();
      					}
      				}
				
				if(this.dead){CaricaPartita(stringaSalvataggio);}
      				if (this.life < 1 && !this.dead) { //gameover
					this.stance=[9,1];
      					disegnaSchermoDiGioco(false);
      					objAlert = new newAlert("Gameover", gamestate, 30);
      					gamestate = 5;
					this.dead=true;
      				}

      				if (keys[startkey]) { //menu di pausa
      					if (!tastoGiaSchiacciato && !(this.life < 1)) { //ho dovuto fare il check della vita se no era possibile far aprire il menu dopo essere morti se si schiacciava INVIO nello stesso frame in cui si moriva
      						if (this.canChangeWeap) { //menu di pausa completo non apribile se si sta usando il potere di sting cham, almeno non si cambia potere
      							objMenuDiPausa = new newMenuDiPausa();
      							disegnaSchermoDiGioco(false);
      							tastoGiaSchiacciato = true;
      							gamestate = 2;
      						} else {
      							objAlert = new newAlert("pause", -1);
      							gamestate = 5;
      						}
      					}
      				}

				if (keys[mapkey]) { //menu mappa
      					if (!tastoGiaSchiacciato) { //ho dovuto fare il check della vita se no era possibile far aprire il menu dopo essere morti se si schiacciava INVIO nello stesso frame in cui si moriva
      						objMenuMappa = new newMenuMappa(gamestate);
      						disegnaSchermoDiGioco(false);
      						tastoGiaSchiacciato = true;
      						gamestate = 7;
      					}
      				}

      				if (this.canMove && tastoGiaSchiacciato && !(keys[startkey] || keys[lkey] || keys[rkey])) { //azzera tasto gia schiacciato
      					tastoGiaSchiacciato = false;
      				}
      				player.calculateStance(player); //calcola lo sprite attuale da mostrare a schermo
      			} //fine della funzione playerPhysics - se riesco la faccio diventare un metodo di player invece che una funzione sestante
      			this.calcolaPlayerColor = function () { //calcola i colori attivi del player e li applica nel canvas di appoggio
      				if (this.invulnerability < 90000) { //se non e' stingCham charge3 
      					if (this.activePower == 0) {
      						this.color1 = this.defaultColor1;
      						this.color2 = this.defaultColor2;
      					} else {
      						this.color1 = this.power[this.activePower - 1].color1;
      						this.color2 = this.power[this.activePower - 1].color2;
      					}
      				} else { //se invece stingCham charge3
      					var colorNumber = this.invulnerability - 90000;
      					if (colorNumber > 950) {
      						this.color1 = "#ff1100";
      						this.color2 = "#ffa7a1";
      					} else if (colorNumber > 900) {
      						this.color1 = "#ff9500";
      						this.color2 = "#ffcc85";
      					} else if (colorNumber > 850) {
      						this.color1 = "#ffe400";
      						this.color2 = "#fff38d";
      					} else if (colorNumber > 800) {
      						this.color1 = "#aaff00";
      						this.color2 = "#d8ff8c";
      					} else if (colorNumber > 750) {
      						this.color1 = "#00ffb3";
      						this.color2 = "#a8ffe5";
      					} else if (colorNumber > 700) {
      						this.color1 = "#00b9ff";
      						this.color2 = "#bbecff";
      					} else if (colorNumber > 650) {
      						this.color1 = "#6100ff";
      						this.color2 = "#b78aff";
      					} else if (colorNumber > 600) {
      						this.color1 = "#e800ff";
      						this.color2 = "#fac6ff";
      					} else if (colorNumber > 550) {
      						this.color1 = "#ff1100";
      						this.color2 = "#ffa7a1";
      					} else if (colorNumber > 500) {
      						this.color1 = "#ff0084";
      						this.color2 = "#ffc7e4";
      					} else if (colorNumber > 450) {
      						this.color1 = "#ff9500";
      						this.color2 = "#ffcc85";
      					} else if (colorNumber > 400) {
      						this.color1 = "#ffe400";
      						this.color2 = "#fff38d";
      					} else if (colorNumber > 350) {
      						this.color1 = "#aaff00";
      						this.color2 = "#d8ff8c";
      					} else if (colorNumber > 300) {
      						this.color1 = "#00ffb3";
      						this.color2 = "#a8ffe5";
      					} else if (colorNumber > 250) {
      						this.color1 = "#00b9ff";
      						this.color2 = "#bbecff";
      					} else if (colorNumber > 200) {
      						this.color1 = "#6100ff";
      						this.color2 = "#b78aff";
      					} else if (colorNumber > 150) {
      						this.color1 = "#e800ff";
      						this.color2 = "#fac6ff";
      					} else if (colorNumber > 100) {
      						this.color1 = "#ff0084";
      						this.color2 = "#ffc7e4";
      					} else {
      						this.color1 = this.power[this.activePower - 1].color1;
      						this.color2 = this.color2 = this.power[this.activePower - 1].color2;
      					}
      				}
				//ora disegno sul canvas di appoggio il player con i vari pezzi di armatura ottenuti (armaturaAcquired)
				this.sprite.ctx.clearRect(0,0, this.sprite.width, this.sprite.height);
      				this.sprite.ctx.drawImage(this.spriteDefault, 0, 0, this.spriteDefault.width, 2*this.sprite.alt, 0, 0, this.spriteDefault.width, 2*this.sprite.alt);
				for(var i=0; i<4; i++){
					if(armaturaAcquired[i]){
      						this.sprite.ctx.drawImage(this.spriteDefault, 0, (i+1)*2*this.sprite.alt, this.spriteDefault.width, 2*this.sprite.alt, 0, 0, this.spriteDefault.width, 2*this.sprite.alt);
					}
				}
      			}//fine di calcolaPlayerColor();
			this.calcolaPlayerColor(); //chiamo subito calcolaPlayerColor, per inizializzare il canvas di appoggio quando viene costruito il player
      			this.calculateStance = function () { //calcola a che animazione della spritesheet e' il player
      				var previousStance = this.stance[0];
      				var maxTimer = 9; //quanti "frame" rimane un animazione. Dico "frame" ma in realta' e' un numero calcolato sui cicli dell'engine
				if(this.invulnerability>19 && this.invulnerability<31){this.stance=[9,0]; return;} //colpito
      				if (this.attackTimer>0 && !this.dead) {
					this.attackTimer--;
					this.stance[1]=1;
      				} else {
					this.stance[1]=0;
				}
				if(Math.round(this.yv)!=0){ //player in aria
					this.sprite.timer=-1;
					if(this.touchingWall && Math.round(this.yv)>0){
						this.stance[0]=8;
					}else{
						this.stance[0]=7;
					}
				}else{
					if(Math.round(this.xv)==0){//fermo
						this.stance[0]=0;
						this.sprite.timer=-1;
					}else{ //in movimento
      						if (this.speed > this.defaultspeed + 0.1) { //running
							maxTimer=6;
      							switch (this.sprite.timer) {
      								case 0:
      									this.stance[0] = 5;
      									break;
      								case 1 * maxTimer:
      									this.stance[0] = 6;
      									break;
      								case 2 * maxTimer:
      									this.sprite.timer = -1;
      									break;
      							}
      						} else { //walking
      							switch (this.sprite.timer) {
      								case 0: 
      									this.stance[0] = 1;
      									break;
      								case 1 * maxTimer:
      									this.stance[0] = 2;
      									break;
      								case 2 * maxTimer:
      									this.stance[0] = 3;
      									break;
      								case 3 * maxTimer:
      									this.stance[0] = 4;
      									break;
      								case 4 * maxTimer:
      									this.sprite.timer = -1;
      									break;
      							}

      						}
					}
      					if (previousStance == this.stance[0]) {
	      					this.sprite.timer++;
      					}
				}
      			} //fine di calculateStance()
      		} //fine di PlayerX

      	} else if (currentPlayer == 1) {
      		var player = new Player();
      		return player;

      		//prototipo di Riccardo
      		function Player() {
      			this.name = "riccardo belmonte";
      			this.lifeMax = 16;
      			for (i = 0; i < 8; i++) {
      				if (heartAcquired[i]) {
      					this.lifeMax += 2;
      				}
      			} //aumenta la vita massima di 2 per ogni cuore trovato
      			this.life = this.lifeMax;
      			this.sprite = new Image();
      			this.sprite.src = "data:image/png;base64,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";
      			this.spriteTimer = 0;
      			this.subWeaponImg = new Image();
      			this.subWeaponImg.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIcAAAAPCAYAAADOBNy/AAAAAXNSR0IArs4c6QAABURJREFUWIXtWT2I5DYU/rxcMVW4anE55ZTmiqBSpHJ1uApTiiuW4YpgUrmcKqgKqo7hikPlkMps5Sq4Co8UwVVwFaYctrrS1SqFLa//5PXsbkIu3APBjKRP7+npe09PMx4cUt1eGft59fbec837iv3/Yl+5QF3AVN+cwq/YC7A3152+u4uw7Lc/On1vLrfZ9w3OZ2+RzdXtlQHXJkiKydZlm0vpU8ar2ytDMXvS2s/V+xwsxczkVI6aVHq5r3zfSKWNVNrA981im33fBElhcioN+IXYBk8xa3FT2KvugGVOQcWoATWzppR3sS6Zxd5cQymCiyD/mN5nYMXbewBAst9Daw0iatsivb7fO5hWfN+sfvhm8pBfbL++b2i7RrXVoO0a1o5JbK+D65qJXWmyydT8x6JvyshJrO+bLVBH0KXY5+h9IlYymCoVpkqFoZj1WpWKeV91soXNGCzcGoqZkQzGEmeEtYRq2ihzdNrsfps5beYYkNTOH9UczxWptElicVFxBAA4n70jgGMs2jX0Tpm1CMHZZtl63U2ez4ttsIdZ5CWYIg8AKGZGKXoUu9plAIA8zcEjDgCYRfm+kYkEAJRlCQCQiQQ/HaAUIY4ZJAicMQB3PWggMuey47E3bv3rMzhjdeaAQE6EBHX90Z36ypmqhtmjI930o366h2Ro5zLGwMKticKwh0mzDJQdvS7WlSItMQDgpDPkVBrONvNY3zd5mj+YH/HeZl3YbpQHfIOKb0yRl1CKoFMBEWmIt/ejQrOgmkxW7HUy56vVzTXyNAcRoSxLCCGQ7PcoTycg3CGO0RIEANRfn1DdvmuxgQBUtBrpyCXrfecJYaWvnQVu+nqLRB09qA0AgIVbAzz4ztq8OHPYumMoNcMfpAIQhSHYoJ8xBgpDk2YZgF9G61gCWGMPJ8JuXa9x0u6IAVAXZyJDnFZQ0Qo8IWAjASSjaOjZ2hBDRBoAoFMBoCYJFPUO3yX2sIE6AzDGgKOYnMsCDh5xyES2xABqf6VZBrbXCGhTR/LJh0z6+IIK8AEHc8nq/S4R3zciEtAH2fMJZUdP7BKjU93z1yw5AhagkMFseh6m3t22zhI1CfpC2bFe6/30nS+VNn75GQBwOBEsQcQhnr8izmev0GFLEABAmSy6WpTUiGOGfBD5R8CLAWf2DBru26tEJhJJc5q0XU9iqMjBAo5EJmABb/uiMAQVOZL9HlKVICJI1Bk07tYLZZ8tvatkMDaS5jpL0joQWz81oqmwe2gJ8sqmkKkUX1CBICnMkCDd+UNsQGRaEkzIHBYAzpvX8MvP2K0ZDieCOMSerUFmsR2CTBHDheWsJkacCBR5WUctoYfVt1eYs3lO+nrvDP9QZxAq8naODSRLEJtJhtie3qmXTmfPo/3eLLX4AevOHLnwwLVxEcQlTypGG2GMgYhagliSLV6zIcglxShT5FWpMErqESlscapnMsilYknRyzQdolhidPteSsqyBE4H8ESNB08xynLX67oC3G9j5KL93cM+ZYeR48ROyBy2rTeaWuW8eb0Y25MJYriwq0h7ALCKtDckxmPYYnDND2ssJ/Zj/QJJswz21WJFJrIlRvXxDi/q54930KmGCHeQEXpNbErIWEGnuqd3nHp//lR/yTvR2rxcqh/fOV8Yj6XbufHuWE5lzwGcbZzX3kvopes/nU/lx7DFr9+61CL47vd5X91cgwW8Ld6JyEmMSZuaIrwtwJur9FFfdX6uH40P9E5GGfCF/k/xBWL5h+/bvvx9/YpbrNcGMurAfWmbZyPOfv6v/Vv4FfvvYP8GVuonnZsE/ksAAAAASUVORK5CYII=";
      			this.defaultColor1 = '#f8b202'; //per hud
      			this.color1 = this.defaultColor1;
      			this.x = 0;
      			this.y = 0;
      			this.yv = 0;
      			this.xv = 0;
      			this.slope = 0;
      			this.width = 30;
      			this.standingHeight = 57;
      			this.crouchedHeight = 33;
			this.damageWhip=[2,3];
			this.damageSliding=[2,2];
			this.damageUppercut=[4,4];
			this.entityWhippedIndex=[];
      			this.height = this.standingHeight;
      			this.crouching = false;
      			this.sliding = false;
			this.uppercut = false;
      			this.attacking = false;
      			this.attackTimer = 0;
			this.attackTimerMax = 32; //whip frames
      			this.subWeaponHeart = 0;
      			this.speed = 0.7;
      			this.stance = [0, 0]; //colonna, riga (x,y)
      			this.defaultspeed = 0.7;
      			this.jumpheight = 13.5;
      			this.giasaltato = false;
      			this.giasparato = false;
      			this.facingRight = true;
      			this.isInWater = false;
      			this.invulnerability = 0;
      			this.canMove = true;
      			this.stun = false;
      			this.canChangeWeap = true;
      			this.carica = 0;
      			this.activePower = 0;
      			this.activeShot = 0;
      			this.inputBuffer = "";
			this.bufferTimer = 0;
			this.bufferTimerMax = 20;
      			this.power = [ //vettore dei poteri
      				{
      					usageMax: 28,
      					usage: 28,
      					color1: '#687968',
      					color2: '#d9b289',
      					nome: 'Knife'
      				},
      				{
      					usageMax: 28,
      					usage: 28,
      					color1: '#1a914f',
      					color2: '#60d1aa',
      					nome: 'Axe'
      				},
      				{
      					usageMax: 28,
      					usage: 28,
      					color1: '#e13e60',
      					color2: '#a1c1aa',
      					nome: 'Rebound Stone'
      				},
      				{
      					usageMax: 28,
      					usage: 28,
      					color1: '#f14f02',
      					color2: '#f8e179',
      					nome: 'Vibhuti'
      				},
      				{
      					usageMax: 28,
      					usage: 28,
      					color1: '#e40097',
      					color2: '#e191c1',
      					nome: 'Bible'
      				},
      				{
      					usageMax: 28,
      					usage: 28,
      					color1: '#f8b202',
      					color2: '#a1a1a1',
      					nome: 'Agunea'
      				},
      				{
      					usageMax: 28,
      					usage: 28,
      					color1: '#606081',
      					color2: '#81aa89',
      					nome: 'Cross'
      				},
      				{
      					usageMax: 28,
      					usage: 28,
      					color1: '#35e1f8',
      					color2: '#f8e14f',
      					nome: 'Holy Water'
      				},
      			];
      			this.disegnaPlayer = function (xdisegnata, ydisegnata, stance, sprite, facingRight) {
      				var mostraWhip = 0;
      				if (player.attackTimer > 14) {
      					mostraWhip = 41;
      				}
      				if (facingRight) {
      					ctx.drawImage(sprite, 16 * stance[0], 32 * stance[1], 16+mostraWhip, 32, xdisegnata, ydisegnata-6, (16+mostraWhip)*2, 32*2);
      				} else {
      					ctx.save(); //salvo il canvas attuale
      					ctx.scale(-1, 1); //flippa il canvas per fare lo sprite mirrorato
      					ctx.drawImage(sprite, 16 * stance[0], 32 * stance[1], 16+mostraWhip, 32, -xdisegnata+(mostraWhip*2), ydisegnata-6, (-16-mostraWhip)*2, 32*2); //uso -xdisegnata perche' le coordinate del canvas sono mirrorate in negativo
      					ctx.restore(); //faccio tornare come prima al punto di save() altrimenti rimane buggato
      				}
				if(debugMode){
					ctx.fillStyle="#00ff0080"; ctx.fillRect(xdisegnata, ydisegnata, this.width, this.height);
					ctx.textAlign = "center";
					disegnaTestoConBordino("t:"+player.bufferTimer+" buffer:"+player.inputBuffer, canvasWidth/2, canvasHeight-40, "#000000"); 
					ctx.textAlign = "left";
				}
      			}
			
			this.getHit = function (damage, skipInvulnerability){
				if(player.invulnerability<1 || skipInvulnerability){
      					if (armaturaAcquired[3] && (damage > 1)) {
      						player.life = player.life - (damage - 1);
      					} else {
      						player.life = player.life - damage;
      					}
					player.invulnerability = 40;
      					player.stun = true;
					if(player.attacking){player.attackTimer=player.attackTimerMax+1;}//disable attacks
					if(player.crouching){ //stop crouching
						player.sliding = false;
						player.crouching = false;
	      					player.y -= (player.standingHeight - player.crouchedHeight);
						player.height = player.standingHeight; //stop crouching and make the player stand up
					}
					player.xv=player.xv/3; //riduco il movimento x
					if(player.yv<0){ player.yv=player.yv/2; } //riduco il salto
				}
			}

      			this.physics = function (player, lvl) { //this function handles the platformer physics - in realta' solo del player
      				var gravityApplicata = 0;
      				var frizioneApplicata = 0;
      				if (player.y > level.waterLevel) { //determina se sei in acqua o no
      					if (!player.isInWater) {
      						player.isInWater = true;
      						player.yv = 0;
      					}
      					gravityApplicata = level.gravityWater;
      					frizioneApplicata = level.frictionWater;
      				} else {
      					player.isInWater = false;
      					gravityApplicata = level.gravity;
      					frizioneApplicata = level.friction;
      				}

      				player.yv += gravityApplicata; //get level gravity
      				player.y += player.yv; //apply gravity

      				for (var i = 0; i < lvl.length; i++) { //y collision con level
      					if (collisionBetween(player, lvl[i])) {
      						player.y += -player.yv;
      						player.yv = 0;
      						if (keys[dashkey] && player.canMove && armaturaAcquired[1]) { //dash
      							player.speed = player.defaultspeed * 2.25;
      						} else {
      							player.speed = player.defaultspeed;
      						}
      						if (keys[jumpkey] && player.canMove) { //jump
      							if (!player.giasaltato) {
      								player.yv = -player.jumpheight;
      								player.giasaltato = true;
      							} else {
      								player.yv = 0;
      							}
      						} else {
      							player.giasaltato = false;
      						}
      					}
      				}

      				for (var i = 0; i < entity.length; i++) { //y collision con entity (piattaforma e ostacolo)
      					if (entity[i].life > 0 && entity[i].type == "platform" && !entity[i].disabled) {
      						if (collisionBetween(player, entity[i])) {
      							if (((player.y + player.height) > entity[i].y) && ((player.y + player.height) < entity[i].y + 19)) { //collisione con y
      								player.y = entity[i].y - player.height;
								if(entity[i].yv){player.yv = entity[i].yv * 1.1;}else{player.yv=0;}
      								if (keys[dashkey] && player.canMove && armaturaAcquired[1]) { //dash
      									player.speed = player.defaultspeed * 2.25;
      								} else {
      									player.speed = player.defaultspeed;
      								}
      								if (keys[jumpkey] && player.canMove) { //jump
      									if (!player.giasaltato) {
      										player.yv = -player.jumpheight;
      										player.giasaltato = true;
      									} else {
      										player.yv = 0;
      									}
      								} else {
      									player.giasaltato = false;
      								}
								if(entity[i].name=="thin platform" && keys[giukey] && keys[jumpkey]){
									player.y=Math.ceil(player.y)+1; //salta giu dalla platform
									player.yv=1;
								}
      								if(entity[i].speed){ //se l'entita si muove, il player si muove con essa
      									player.xv += entity[i].xv;
      									if (entity[i].xv > 0) {
      										if (player.xv > entity[i].xv) {
      											player.xv = entity[i].xv / 1.85;
      										}
      									} else {
      										if (player.xv < entity[i].xv) {
      											player.xv = entity[i].xv / 1.85;
      										}
      									}
      									player.x -= player.xv;
      									for (var j = 0; j < lvl.length; j++) {
      										if (collisionBetween(player, lvl[j])) {
      											player.x += player.xv * 2;
      										}
      									}
      								}
      							} else { //collisione con x
      								player.y += player.slope;
      								player.x -= -player.xv;
      								if (keys[dashkey] && player.canMove && armaturaAcquired[1]) { //wall dash
      									player.speed = player.defaultspeed * 2.25;
      								} else {
      									player.speed = player.defaultspeed;
      								}
      							}
      						}
      					}
      				}

      				if (player.crouching && keys[jumpkey] && armaturaAcquired[1] && !player.stun && !player.attacking && !tastoGiaSchiacciato) { //sliding
      					player.sliding = true;
					player.damageSliding[0]=player.damageSliding[1];
      					tastoGiaSchiacciato = true;
      					player.invulnerability = 825; //800-825 range per lo sliding (fa anche da timer)
      				}
      				if (player.sliding) {
      					if (player.invulnerability < 801 || player.yv > 0.5 || player.yv < -0.5) { //disattiva slide
      						player.sliding = false;
      						player.invulnerability = 1;
      						player.xv = player.xv * 0.01;
      					} else if (player.invulnerability > 801) { //movimento
      						if (player.facingRight) {
      							player.xv -= player.defaultspeed * 2.5;
      						} else {
      							player.xv += player.defaultspeed * 2.5;
      						}
      					}
      				}

				if (player.uppercut) {
      					if (player.invulnerability < 601) { //disattiva uppercut
      						player.uppercut = false;
						player.yv=player.yv/2;
      						player.invulnerability = 5;
      					} else if (player.invulnerability > 601) { //uppercut
      						player.yv -= player.defaultspeed * 2;
      					}
      				}

      				if (keys[giukey]) { //crouching
      					if (player.yv < 1 && player.yv > -1 && player.xv < 3 && player.xv > -3 && player.canMove) { //solo quando il player e' a terra ed e' quasi fermo
      						player.crouching = true;
      						player.y += (player.standingHeight - player.crouchedHeight);
      						player.height = player.crouchedHeight;
      					}
      				} else {
      					if (player.crouching && !player.sliding && !player.attacking) {
      						player.crouching = false;
      						player.y -= (player.standingHeight - player.crouchedHeight);
      						player.height = player.standingHeight; //stop crouching and make the player stand up
      					}
      				}
      				if (player.crouching && !player.sliding && !(player.yv < 1 && player.yv > -1 && player.xv < 3 && player.xv > -3)) {
      					player.crouching = false;
      					player.y -= (player.standingHeight - player.crouchedHeight);
      					player.height = player.standingHeight; //stop crouching and make the player stand up
      				}


      				if (keys[sparokey] && (player.canMove || (player.crouching && !player.sliding))) { //attacking
      					player.attacking = true;
      				}
      				if (player.attacking) {
      					player.attackTimer++;
      					if ((player.yv > 0.4 || player.yv < -0.4) && (player.xv > 1 || player.xv < -1)) { //se il player e' in salto e si stava gia muovendo
      						if (keys[destrakey]) {
      							player.xv -= player.speed;
      						}
      						if (keys[sinistrakey]) {
      							player.xv += player.speed;
      						}
      					}
      					if (player.attackTimer > 14) {
      						var corda = [];
						if(armaturaAcquired[2]){
      							corda["damage"] = player.damageWhip[1];
						}else{
      							corda["damage"] = player.damageWhip[0];
						}
      						corda["width"] = 84;
      						corda["height"] = 24;
      						if (player.facingRight) {
      							corda["x"] = player.x + player.width;
      						} else {
      							corda["x"] = player.x - corda.width;
      						}
      						corda["y"] = player.y + 2;
      						for (var i = 0;; i++) { //contatto con entita'
							for(var j=0; j < player.entityWhippedIndex.length; j++){ //skippa le entita' gia' whippate con questo colpo
								if(i==player.entityWhippedIndex[j]){
									i++; j=-1; 
								}
							}
							if(!(i<entity.length)){break;}//the cycle check is mid cycle because i can change the i with the previous for.
      							if (entity[i].life > 0 && !(entity[i].type == "sparoDelPlayer" || entity[i].type == "pickup" )) {
      								if (collisionBetween(corda, entity[i])) {
      									if (entity[i].getHit) {
      										entity[i].getHit("corda", corda.damage);
										player.entityWhippedIndex.push(i);
      									}else{
										if(entity[i].type == "enemyShot"){ //shot eraser
											entity[i].life=-1;
										}
									}
      								}
      							}
      						}
      					}
      					if (player.attackTimer > player.attackTimerMax) {
      						player.attackTimer = 0;
      						player.xv = player.xv / 5;
      						player.attacking = false;
						player.entityWhippedIndex=[];
      					}
      				}

      				if (keys[destrakey] && player.canMove) { //x movement
      					player.xv -= player.speed;
      					player.facingRight = true;
      				}
      				if (keys[sinistrakey] && player.canMove) {
      					player.xv += player.speed;
      					player.facingRight = false;
      				}
      				player.xv *= frizioneApplicata;
      				player.x += -player.xv;

      				player.slope = 0; //serve per i bordi tipo - serve anche per le collision
      				for (var i = 0; i < lvl.length; i++) {
      					if (collisionBetween(player, lvl[i])) {
      						if (player.slope != -8) {
      							player.y -= 1;
      							player.slope += 1;
      						}
      					}
      				}

      				for (var i = 0; i < lvl.length; i++) { //x collision
      					if (collisionBetween(player, lvl[i])) {
      						player.y += player.slope;
      						player.x -= -player.xv;
      					}
      				}

      				for (var i = 0; i < entity.length; i++) { //contatto con entita'
      					if (entity[i].life > 0 && !(entity[i].type == "sparoDelPlayer")) {
      						if (collisionBetween(player, entity[i])) {
      							if (entity[i].damage > 0) {
      								if (player.invulnerability < 1) { //entity collison
									player.getHit(entity[i].damage);
      									break;
      								}else if (player.sliding){ //sliding
								      	if (entity[i].getHit) {
      										entity[i].getHit("playerSlide", player.damageSliding[0]);
      									}
									if(entity[i].life>0 || !entity[i].getHit){ //se l'entita e' viva o non puo essere colpita (tipo Spike)
										player.getHit(entity[i].damage,true);
										player.damageSliding[0]=0;
									}
								}else if (player.uppercut){
									if (entity[i].getHit) {
      										entity[i].getHit("playerUppercut", player.damageUppercut[0]);
										if(enitity[i].life>0){ player.damageUppercut[0]=0;}
      									}
								}
      							} else { //qui stiamo parlando delle entita' con danno<1, praticamente i pickup (se hanno il danno in negativo restituiscono la vita a X)
      								if ((player.life - entity[i].damage) > player.lifeMax) {
      									var vitaRecuperabile = (0 - entity[i].damage) - (player.lifeMax - player.life);
      									player.life = player.lifeMax;
      									for (j = 0; j < 4; j++) { //qui inizia a riempire le subtank
      										if (subtank[j].acquired) {
      											if ((subtank[j].life + vitaRecuperabile) > subtank[j].lifeMax) {
      												vitaRecuperabile = vitaRecuperabile - (subtank[j].lifeMax - subtank[j].life);
      												subtank[j].life = subtank[j].lifeMax;
      												i++;
      											} else {
      												subtank[j].life = subtank[j].life + vitaRecuperabile;
      												break;
      											}
      										}
      									}
      								} else {
      									player.life = player.life - entity[i].damage;
      								}
      							}
      						}
      					}
      				}

      				if (keys[lkey] && !tastoGiaSchiacciato && player.canMove && player.canChangeWeap) { //previous available power
      					tastoGiaSchiacciato = true;
      					for (i = player.activePower - 1;; i--) {
      						if (i == -1) {
      							i = 8;
      						} else if (i == 0) {
      							player.activePower = 0;
      							break;
      						}
      						if (levelDefeated[i - 1]) {
      							player.activePower = i;
      							break;
      						}
      					}
      				}

      				if (keys[rkey] && !tastoGiaSchiacciato && player.canMove && player.canChangeWeap) { //next available power
      					tastoGiaSchiacciato = true;
      					for (i = player.activePower + 1;; i++) {
      						if (i == 9) {
      							player.activePower = 0;
      							break;
      						} else if (levelDefeated[i - 1]) {
      							player.activePower = i;
      							break;
      						}
      					}
      				}

      				if (player.invulnerability > 0) { //se l'invulnerabilita' e' >=1 la riduce
      					player.invulnerability--;
      					if (player.invulnerability < 20) {
      						player.stun = false;
      					}
      				}

				if(player.dead){CaricaPartita(stringaSalvataggio);}
      				if (player.life < 1 && !player.dead) { //gameover
					player.calculateStance(player); //calcolo lo sprite del player
      					disegnaSchermoDiGioco(false);
      					objAlert = new newAlert("Gameover", gamestate, 30);
      					gamestate = 5;
					player.dead=true;
      				}

      				if (keys[startkey]) { //menu di pausa
      					if (!tastoGiaSchiacciato && !(player.life < 1)) { //ho dovuto fare il check della vita se no era possibile far aprire il menu dopo essere morti se si schiacciava INVIO nello stesso frame in cui si moriva
      						if (player.canChangeWeap) { //menu di pausa completo non apribile se si sta usando il potere di sting cham, almeno non si cambia potere
      							objMenuDiPausa = new newMenuDiPausa();
      							disegnaSchermoDiGioco(false);
      							tastoGiaSchiacciato = true;
      							gamestate = 2;
      						} else {
      							objAlert = new newAlert("pause", -1);
      							gamestate = 5;
      						}
      					}
      				}

				if (keys[mapkey]) { //menu mappa
      					if (!tastoGiaSchiacciato) { //ho dovuto fare il check della vita se no era possibile far aprire il menu dopo essere morti se si schiacciava INVIO nello stesso frame in cui si moriva
      						objMenuMappa = new newMenuMappa(gamestate);
      						disegnaSchermoDiGioco(false);
      						tastoGiaSchiacciato = true;
      						gamestate = 7;
      					}
      				}

      				if (player.canMove && tastoGiaSchiacciato && !(keys[startkey] || keys[lkey] || keys[rkey] || keys[sparokey])) { //azzera tasto gia schiacciato
      					tastoGiaSchiacciato = false;
      				}

      				if (!player.stun && !player.crouching && !player.sliding && !player.attacking && !player.uppercut) {
      					player.canMove = true;
      				} else {
      					player.canMove = false;
      				}

				player.calculateInputBuffer(); //calcola le combo
      				player.calculateStance(player); //calcola lo sprite attuale da mostrare a schermo
      			} //fine di Riccardo.physics()

      			this.calculateStance = function (player) { //calcola a che animazione della spritesheet e' il player
      				let previousStance = [player.stance[0], player.stance[1]];
      				let maxTimer = 9; //quanti "frame" rimane un animazione. Dico "frame" ma in realta' e' un numero calcolato sui cicli dell'engine
      				if (player.attacking) {
      					let riga = 1;
      					if (player.crouching) {
      						riga = 2;
      					}
      					if (player.attackTimer < 14) {
      						player.stance = [0, riga];
      					} else {
      						player.stance = [1, riga];
      					}
				} else if (player.stun){
					player.stance = [5, 2];
				} else if (player.uppercut){
					player.stance = [6, 2];
      				} else {
      					if (Math.round(player.yv) < 3) { //se il player e' a terra o in ascesa
      						if (Math.round(player.yv) > 0 && !player.crouching) {
      							player.stance = [0, 0];
      							player.spriteTimer = -1; //player sta atterando
      						} else if (Math.round(player.yv) > -1) { //player a terra
      							if ((player.xv > 0.3 || player.xv < -0.3) && !player.crouching) { //se il player si sta muovendo
      								if (player.speed > player.defaultspeed + 0.1) { //running
      									switch (player.spriteTimer) {
      										case 0:
      											player.stance = [4, 0];
      											break;
      										case 1 * maxTimer:
      											player.stance = [1, 0];
      											break;
      										case 2 * maxTimer:
      											player.stance = [3, 0];
      											break;
      										case 3 * maxTimer:
      											player.stance = [1, 0];
      											break;
      										case 4 * maxTimer:
      											player.stance = [4, 0];
      											player.spriteTimer = -1;
      											break;
      									}
      								} else { //walking
      									switch (player.spriteTimer) {
      										case 0:
      											player.stance = [0, 0];
      											break;
      										case 1 * maxTimer:
      											player.stance = [1, 0];
      											break;
      										case 2 * maxTimer:
      											player.stance = [2, 0];
      											break;
      										case 3 * maxTimer:
      											player.stance = [1, 0];
      											break;
      										case 4 * maxTimer:
      											player.stance = [0, 0];
      											player.spriteTimer = -1;
      											break;
      									}
      								}
      							} else {
      								if (player.crouching) {
      									if (player.sliding) {
      										player.stance = [5, 1];
      									} else {
      										player.stance = [5, 0];
      									}
      								} else {
      									player.stance = [0, 0];
      								}
      								player.spriteTimer = -1;
      							}
      						} else { //player in ascesa
      							player.stance = [6, 1];
      							player.spriteTimer = -1;
      						}
      					} else { //se invece il player e' in aria (discesa)
      						player.stance = [6, 0];
      						player.spriteTimer = -1;
      					}
      				}
      				if (previousStance[0] == player.stance[0] && previousStance[1] == player.stance[1]) {
      					player.spriteTimer++;
      				}
      			} //fine di calculateStance()

			this.calculateInputBuffer = function () { //calcola il buffer delle combo
				if(player.bufferTimer>0){player.bufferTimer--;}
				if(player.inputBuffer==""){ //caso buffer vuoto
					if(keys[giukey]){
						player.inputBuffer+=giukey;
						player.bufferTimer=player.bufferTimerMax;
					}
				}else if(player.bufferTimer>0){
					switch(player.inputBuffer){
						case (giukey):
							if(keys[sukey] && !keys[giukey]){
								player.inputBuffer+=sukey;
								player.bufferTimer=player.bufferTimerMax;
							}
							break;

						case (giukey+sukey):
							if(keys[jumpkey] && !keys[sukey] && !keys[giukey]){
								player.inputBuffer="";
								player.bufferTimer=0;
								if(player.canMove && armaturaAcquired[1]){//uppercut
									player.yv=player.yv/100;
									player.uppercut=true;
									player.damageUppercut[0]=player.damageUppercut[1];
									player.invulnerability = 625;
								}
							}
							break;
					}
				} else{
					player.bufferTimer=0; player.inputBuffer="";
				}

			}//fine di calculate Buffer

      		} //fine di new Riccardo()

      	}
} //fine di nuovoPlayer()
