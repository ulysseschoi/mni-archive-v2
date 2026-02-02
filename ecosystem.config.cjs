module.exports = {
  apps: [
    {
      name: 'mni-archive-v2',
      script: 'npm',
      args: 'run dev',
      cwd: '/home/user/mni-archive-v2',
      env: {
        NODE_ENV: 'development',
        PORT: 3000
      },
      watch: false,
      instances: 1,
      exec_mode: 'fork'
    }
  ]
}
