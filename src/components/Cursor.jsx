import React, { useEffect, useRef } from 'react'

export default function Cursor() {
  const cursorRef = useRef(null)
  const followerRef = useRef(null)

  useEffect(() => {
    const cursor = cursorRef.current
    const follower = followerRef.current
    let mouseX = 0, mouseY = 0
    let followerX = 0, followerY = 0

    const onMouseMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
      cursor.style.left = mouseX + 'px'
      cursor.style.top = mouseY + 'px'
    }

    const animate = () => {
      followerX += (mouseX - followerX) * 0.12
      followerY += (mouseY - followerY) * 0.12
      follower.style.left = followerX + 'px'
      follower.style.top = followerY + 'px'
      requestAnimationFrame(animate)
    }

    const onHover = () => {
      cursor.style.width = '20px'
      cursor.style.height = '20px'
      cursor.style.background = '#E8C96A'
      follower.style.width = '60px'
      follower.style.height = '60px'
      follower.style.borderColor = '#E8C96A'
    }

    const onLeave = () => {
      cursor.style.width = '12px'
      cursor.style.height = '12px'
      cursor.style.background = '#C9A84C'
      follower.style.width = '36px'
      follower.style.height = '36px'
      follower.style.borderColor = '#C9A84C'
    }

    document.addEventListener('mousemove', onMouseMove)
    document.querySelectorAll('a, button, [role="button"]').forEach(el => {
      el.addEventListener('mouseenter', onHover)
      el.addEventListener('mouseleave', onLeave)
    })

    const raf = requestAnimationFrame(animate)

    return () => {
      document.removeEventListener('mousemove', onMouseMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      <div ref={cursorRef} className="custom-cursor" />
      <div ref={followerRef} className="custom-cursor-follower" />
    </>
  )
}