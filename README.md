# generator-wf-control

[![Build Status](https://travis-ci.org/gxoptg/generator-wf-control.svg)](https://travis-ci.org/gxoptg/generator-wf-control)

Generate control files for (currently proprietary) WF framework.


## Install

    $ npm install --global yo generator-wf-control
    
This installs Yeoman (a scaffolding tool, on top of which is the generator built) and the generator itself.  


## Usage

Run 

    $ yo wf-control
   
to launch the generator. The generator will ask several questions and then generate a control in the current directory.

## Options

You can specify generator options beforehand, and the generator will not ask them. All options can be composed together.

### Control name

    $ yo wf-control [controlName]
    
The control name should only contain latin letters, digits, underscore and dash. `test-control_123` is valid. `test-control_123.abc` is not, because the point can’t be used in the name.

### Control type

    $ yo wf-control --type [generic|informer]
    
Currently supported control types are `generic` and `informer`. Submit an issue or a pull request if you need more. 


## License

MIT © [Ivan Akulov](http://ivanakulov.name), 2015