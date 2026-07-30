import { useEffect, useRef } from 'react'
import {
  AmbientLight,
  Clock,
  Color,
  Group,
  IcosahedronGeometry,
  MathUtils,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  PerspectiveCamera,
  PlaneGeometry,
  PMREMGenerator,
  PointLight,
  Scene,
  WebGLRenderer,
} from 'three'

const MAX_TILT = MathUtils.degToRad(5)
const BASE_Y = 0.35

function Hero3D() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const scene = new Scene()
    const camera = new PerspectiveCamera(40, 1, 0.1, 100)
    camera.position.set(0, 0, 5)

    const renderer = new WebGLRenderer({
      canvas,
      antialias: false,
      alpha: true,
      powerPreference: 'low-power',
    })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1))

    // Bake a small, dark, gold-toned environment map offline (no HDRI fetch,
    // no postprocessing) so the metallic material has something moody to
    // reflect instead of relying on point-light hotspots alone.
    const pmrem = new PMREMGenerator(renderer)
    const envScene = new Scene()
    envScene.background = new Color(0x030302)

    const keyPanel = new Mesh(
      new PlaneGeometry(6, 6),
      new MeshBasicMaterial({ color: new Color('#c9a230') }),
    )
    keyPanel.position.set(3, 2, 1)
    keyPanel.lookAt(0, 0, 0)
    envScene.add(keyPanel)

    const fillPanel = new Mesh(
      new PlaneGeometry(6, 6),
      new MeshBasicMaterial({ color: new Color('#1a1509') }),
    )
    fillPanel.position.set(-3, -1.5, 2)
    fillPanel.lookAt(0, 0, 0)
    envScene.add(fillPanel)

    const envMap = pmrem.fromScene(envScene, 0.04).texture
    scene.environment = envMap
    pmrem.dispose()
    keyPanel.geometry.dispose()
    keyPanel.material.dispose()
    fillPanel.geometry.dispose()
    fillPanel.material.dispose()

    scene.add(new AmbientLight(0xffffff, 0.15))

    const goldLight = new PointLight(0xd4af37, 4)
    goldLight.position.set(3, 2, 4)
    scene.add(goldLight)

    const group = new Group()
    group.position.set(2.7, BASE_Y, -1)
    scene.add(group)

    const geometry = new IcosahedronGeometry(1, 1)
    const material = new MeshStandardMaterial({
      color: new Color('#D4AF37'),
      emissive: new Color('#F7E7A1'),
      emissiveIntensity: 0.04,
      metalness: 0.88,
      roughness: 0.28,
      envMapIntensity: 1.6,
    })
    const mesh = new Mesh(geometry, material)
    mesh.scale.setScalar(0.5)
    group.add(mesh)

    const clock = new Clock()
    const tilt = { x: 0, y: 0 }
    const pointer = { x: 0, y: 0 }
    let spin = 0
    const floatOffset = Math.random() * 1000

    const handlePointerMove = (event: PointerEvent) => {
      pointer.x = (event.clientX / window.innerWidth) * 2 - 1
      pointer.y = (event.clientY / window.innerHeight) * 2 - 1
    }
    window.addEventListener('pointermove', handlePointerMove)

    const resize = () => {
      const width = canvas.clientWidth || 1
      const height = canvas.clientHeight || 1
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height, false)
    }
    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(canvas)
    resize()

    let frame = 0
    let running = true

    const animate = () => {
      const delta = clock.getDelta()

      spin += delta * 0.15
      const targetX = -pointer.y * MAX_TILT
      const targetY = pointer.x * MAX_TILT
      tilt.x = MathUtils.damp(tilt.x, targetX, 4, delta)
      tilt.y = MathUtils.damp(tilt.y, targetY, 4, delta)
      mesh.rotation.x = tilt.x
      mesh.rotation.y = spin + tilt.y

      const t = floatOffset + clock.elapsedTime
      group.position.y = BASE_Y + Math.sin(t / 4) * 0.08

      renderer.render(scene, camera)
      frame = requestAnimationFrame(animate)
    }

    const handleVisibility = () => {
      running = document.visibilityState === 'visible'
      if (running) {
        clock.getDelta()
        animate()
      } else {
        cancelAnimationFrame(frame)
      }
    }

    animate()
    document.addEventListener('visibilitychange', handleVisibility)

    return () => {
      running = false
      cancelAnimationFrame(frame)
      resizeObserver.disconnect()
      window.removeEventListener('pointermove', handlePointerMove)
      document.removeEventListener('visibilitychange', handleVisibility)
      geometry.dispose()
      material.dispose()
      envMap.dispose()
      renderer.dispose()
    }
  }, [])

  return <canvas ref={canvasRef} className="hero-3d-canvas" aria-hidden="true" />
}

export default Hero3D
