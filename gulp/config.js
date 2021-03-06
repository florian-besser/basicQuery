module.exports = {
  rsync: {
    src: ['*'],
    options: {
      destination: '~/production',
      incremental: true,
      progress: true,
      relative: true,
      emptyDirectories: true,
      recursive: true,
      clean: true,
      exclude: ['gulp', 'gulpfile.js', '.DS_Store']
    }
  }
};
