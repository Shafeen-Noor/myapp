<div class="neo-orbit-visual" aria-hidden="true">
	<div class="orbit orbit--1"><div class="asteroid"></div></div>
	<div class="orbit orbit--2"><div class="asteroid"></div></div>
	<div class="orbit orbit--3"><div class="asteroid"></div></div>
	<div class="earth">⊕</div>
</div>

<style>
	.neo-orbit-visual {
		position: relative;
		width: 120px;
		height: 120px;
		flex-shrink: 0;
	}

	.earth {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		font-size: var(--text-lg);
		color: var(--color-secondary);
		text-shadow: var(--glow-secondary);
	}

	.orbit {
		position: absolute;
		top: 50%;
		left: 50%;
		border-radius: var(--radius-full);
		border: 1px solid var(--color-border);
		transform: translate(-50%, -50%);
	}

	.orbit--1 {
		width: 50px;
		height: 50px;
	}
	.orbit--2 {
		width: 80px;
		height: 80px;
	}
	.orbit--3 {
		width: 110px;
		height: 110px;
	}

	.asteroid {
		position: absolute;
		top: 0;
		left: 50%;
		width: 5px;
		height: 5px;
		background: var(--color-primary);
		border-radius: var(--radius-full);
		box-shadow: var(--glow-primary);
		transform: translateX(-50%) translateY(-50%);
		animation: orbitSpin linear infinite;
	}

	.orbit--1 .asteroid {
		animation-duration: 4s;
	}
	.orbit--2 .asteroid {
		animation-duration: 7s;
		background: var(--color-red);
		box-shadow: var(--glow-red);
	}
	.orbit--3 .asteroid {
		animation-duration: 11s;
	}

	@keyframes orbitSpin {
		from {
			transform: translateX(-50%) translateY(-50%) rotate(0deg) translateY(calc(-50% + 1px))
				rotate(0deg);
		}
		to {
			transform: translateX(-50%) translateY(-50%) rotate(360deg) translateY(calc(-50% + 1px))
				rotate(-360deg);
		}
	}
</style>
