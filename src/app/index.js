import { Base } from 'yeoman-generator';
import path from 'path';

export default class WfControlGenerator extends Base {
    constructor(...args) {
        super(...args);

        this.argument('controlName', {
            desc: 'WF control name',
            type: String,
            required: false
        });
    }

    prompting() {
        if (!this.controlName) {
            let currentDir = path.basename(this.destinationRoot());
            let done = this.async();

            this.prompt({
                message: 'How would you like to name the control?',
                type: 'input',
                name: 'controlName',
                default: currentDir
            }, answer => {
                this.controlName = answer.controlName;
                done();
            });
        }
    }

    configuring() {
        this.jsControlName = this.controlName.replace('-', '_');
    }

    get writing() {
        return {
            template() {
                this.fs.copyTpl(
                    this.templatePath('index.wfc'),
                    this.destinationPath(this.controlName + '.wfc'),
                    {
                        controlName: this.controlName,
                        jsControlName: this.jsControlName
                    }
                );
            },

            less() {
                this.fs.copyTpl(
                    this.templatePath('index.less'),
                    this.destinationPath(this.controlName + '.less'),
                    {
                        controlName: this.controlName,
                        jsControlName: this.jsControlName
                    }
                );
            },

            js() {
                this.fs.copyTpl(
                    this.templatePath('index.jsm'),
                    this.destinationPath(this.controlName + '.jsm'),
                    {
                        controlName: this.controlName,
                        jsControlName: this.jsControlName
                    }
                );
            }
        };
    }
}