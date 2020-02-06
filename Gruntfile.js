module.exports = function (grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    gitpull: {
      channels: {
        options: {
          verbose: true,
          cwd: "../rec-channels-service",
        }
      },
      carousel: {
        options: {
          verbose: true,
          cwd: "../video-carousel-service",
        }
      },
      player: {
        options: {
          verbose: true,
          cwd: "../video-player-service",
        }
      },
    },
    run: {
      chatsPack: {
        options: {
          cwd: "../chat-service",
        },
        exec: 'yarn run webpack -p'
      },
      channelsPack: {
        options: {
          cwd: "../rec-channels-service",
        },
        exec: 'npx webpack -p'
      },
      carouselPack: {
        options: {
          cwd: "../video-carousel-service",
        },
        exec: 'npx webpack -d'
      },
      playerPack: {
        options: {
          cwd: "../video-player-service",
        },
        exec: 'npx webpack -d'
      },
    },
    aws: grunt.file.readJSON('.awskeys'),
    aws_s3: {
      options: {
        accessKeyId: '<%= aws.AWSAccessKeyId %>',
        secretAccessKey: '<%= aws.AWSSecretKey %>',
      },
      production: {
        options: {
          bucket: 'kmh01',
        },
        files: [
          { expand: true, cwd: 'www', src: ['**'], dest: '' },
        ]
      },
    },
  })

  grunt.loadNpmTasks('grunt-git');
  grunt.loadNpmTasks('grunt-run');
  grunt.loadNpmTasks('grunt-aws-s3');

  grunt.registerTask('default', ['gitpull']);
  grunt.registerTask('pack', ['run:playerPack', 'run:carouselPack', 'run:channelsPack', 'run:chatsPack'])

};