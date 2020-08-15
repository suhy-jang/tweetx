const floatingFollowBtn = document.getElementById('floating-follow-btn');

document.addEventListener('scroll', () => {
  const scrollDown = window.pageYOffset >= '60';
  if (scrollDown) {
    floatingFollowBtn.classList.add('floating-follow-btn');
  } else {
    floatingFollowBtn.classList.remove('floating-follow-btn');
  }
})

// const scrollDown = window.pageYOffset + window.innerHeight >= document.body.offsetHeight;
