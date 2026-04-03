<div class="apod-header__visual">
	<span class="asteroid"></span>
	<span class="asteroid"></span>
	<span class="asteroid"></span>
</div>

<style>
	.apod-header__visual {
		width: 120px;
		height: 120px;
		background: radial-gradient(circle, var(--color-primary) 0%, transparent 60%);
		position: relative;
	}

	.apod-header__visual::before,
	.apod-header__visual::after {
		content: '';
		position: absolute;
		width: 100%;
		height: 100%;
		border-radius: 50%;
		background: radial-gradient(circle, #fff 0%, transparent 50%);
		animation: sparkle 2s infinite alternate;
		mix-blend-mode: screen;
	}

	@keyframes sparkle {
		0% {
			transform: scale(0.9);
			opacity: 0.5;
		}
		100% {
			transform: scale(1.1);
			opacity: 1;
		}
	}

	.asteroid {
		position: absolute;
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background: var(--color-primary);
		top: 50%;
		left: 50%;
		transform-origin: -30px center;
		animation: orbit 4s linear infinite;
	}

	.asteroid:nth-child(2) {
		animation-duration: 6s;
		transform-origin: -40px center;
	}
	.asteroid:nth-child(3) {
		animation-duration: 8s;
		transform-origin: -50px center;
	}

	@keyframes orbit {
		0% {
			transform: rotate(0deg) translateX(0);
		}
		100% {
			transform: rotate(360deg) translateX(0);
		}
	}
</style>
