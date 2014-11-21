module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		//相对路径
		baseUrl:'app',

		//生成目录
		dir: 'html-build', 
		//只合并js 注意：合并顺序打乱
		concat: {
			//添加头部注释
			options: {
				banner: '/*! <%= pkg.name %><%= grunt.template.today("yyyy-mm-dd") %>  \n*/'
			},
			dist: {
				src: ['<%= baseUrl %>/js/zepto.min.js','<%= baseUrl %>/js/howler.min.js','<%= baseUrl %>/js/main.js'],
				dest: '<%= baseUrl %>/js/dist/app.js'
			}
		},
		
		//合并加压缩 注意：合并顺序打乱
		uglify: {
			//添加头部注释
			options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n 这是个APP */\n'
			},

			//路径生成,名称自定义
			dist: {
				// src: ['js/zepto.min.js','js/howler.min.js','js/main.js'],
				// dest: 'build/main.min.js',
				files: {
					'<%= dir %>/app/js/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
				}
			}
			//  ,
			//   dynamic_mappings: {
			//   // Grunt will search for "**/*.js" under "lib/" when the "uglify" task
			//   // runs and build the appropriate src-dest file mappings then, so you
			//   // don't need to update the Gruntfile when files are added or removed.
			// files: [
			//     {
			//       expand: true,     // Enable dynamic expansion.
			//       cwd: 'js/',      // Src matches are relative to this path.
			//       src: ['**/*.js'], // Actual pattern(s) to match.
			//       dest: 'build/',   // Destination path prefix.
			//       ext: '.min.js'  // Dest filepaths will have this extension.
			//     },
			//   ],
			// }
		},
		sass: {
	      //target
	      // 编译
	      build: {
	        options: {
	          paths: ['sass/'],
	          yuicompress: true
	        },
	        files: {
	          '<%= baseUrl %>/css/game.css': ['sass/main.scss']
	        }
	        // files: [
	        //     {
	        //         expand: true,
	        //         cwd: 'sass/',
	        //         src: ['*.sass'],
	        //         dest: 'html/style/',
	        //         ext: '.css'
	        //     }
	        // ]
	      }
	    },
		cssmin: {
	         // minify
	         options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %>*/'
			 },
	         combine: {
	            options: {
	               report: 'gzip'
	            }, 
	            files: {
	                '<%= dir %>/app/css/main.min.css': ['<%= baseUrl %>/css/*.css', '<%= baseUrl %>/css/*.min.css']
	            }
	            // files: [
	            //   {
	            //      expand: true,
	            //      cwd: 'html/css/',
	            //      src: ['*.css', '!*.min.css'],
	            //      dest: 'html/css/',
	            //      ext: '.min.css'
	            //   }
	            // ] 
	         } 
	    },
		imagemin: {
	      dynamic: {
	          options: {
	              optimizationLevel: 3
	          },
	          files: [{
	            expand: true,
	            cwd: '<%= baseUrl %>/images/',
	            src: ['**/*.*{png,jpg,png}'],
	            dest: '<%= dir %>/app/images/'
	          }]
	      }
	    },
		includereplace: {
			dist: {
				options: {
					globals: {
						var1: 'one',
						var2: 'two',
						var3: 'three'
					},
				},
				files: {
			      '<%= dir %>/': ['*.html', '!node_modules/**/*.html','*.js', '!node_modules/**/*.js']
			  
			    }
			}
		},
		watch: {
			files: ['sass/*.scss','app/js/*.js','app/js/*.js','app/css/*.css','app/images/*'],
			tasks: ['sass','concat','uglify','cssmin','imagemin']
		}

	});

	// 加载包含 "uglify" 任务的插件。
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-include-replace');
	grunt.loadNpmTasks('grunt-contrib-watch');

	// 默认被执行的任务列表。
	grunt.registerTask('default', ['sass','uglify', 'concat','cssmin','imagemin','includereplace']);

};