function isAllSymbols(text) {
  // 使用正则表达式来检查字符串是否都是符号 
  return /^[!@#$%^&*—“…”()_+{}\[\]:;<>,.?~\\/-]+$/g.test(text);
}
export default class TextToSpeechReader {
      constructor({id,endPlay}) {
        this.initData(id)
        this.endPlay = endPlay
      }
      

      initData(id){
        this.currentParagraphIndex = 0;
        this.isReading = false;
        this.textToRead = document.getElementById(id);
        this.paragraphs = [this.textToRead.querySelector("h1"), ...this.textToRead.querySelectorAll("p")];
        this.audioElement = new Audio();
        this.audioElement1 = new Audio();
        this.selection = window.getSelection();
        this.range = document.createRange();
        this.audioElement.addEventListener("play", this.audioPlay);
        this.audioElement.addEventListener("ended", this.audioEnded);
        this.audioElement1.addEventListener("play", this.audioPlay);
        this.audioElement1.addEventListener("ended", this.audioEnded);
        this.audioElement.addEventListener('timeupdate', this.handleTimeUpdate);
        this.audioElement1.addEventListener('timeupdate', this.handleTimeUpdate);
      }
      handleTimeUpdate =() =>{
        const { current } = this.getAudios()
        if (current.currentTime === current.duration && this.currentParagraphIndex ===this.paragraphs.length - 1) {
            console.log('本章音频播放完成！');
            this.endPlay()
        }
      }
      createAudioUrl (text) {
        let newText = text
        if(isAllSymbols(text)){
          newText = '略'
        }
        return `https://dds.dui.ai/runtime/v1/synthesize?voiceId=qiumum_0gushi&text=${newText}&speed=1&volume=50&audioType=wav`;
      }
      getFirstVisibleIndex () {
        const viewportTop = window.scrollY || window.pageYOffset;
        const viewportBottom = viewportTop + window.innerHeight;
        for (let i = 0; i < this.paragraphs.length; i++) {
          const pTag = this.paragraphs[i];
          const pTagTop = pTag.getBoundingClientRect().top + viewportTop;

          if (pTagTop >= viewportTop && pTagTop <= viewportBottom) {
            return i;
          }
        }

        return null;
      }
      isTextSelected () {
        const selection = window.getSelection();
        return selection.toString().length > 0;
      }
      getAudios () {
        return {
          current: this.currentParagraphIndex % 2 === 1 ? this.audioElement1 : this.audioElement,
          next: this.currentParagraphIndex % 2 === 1 ? this.audioElement : this.audioElement1
        };
      }
      readCurrentParagraph () {
        if (this.currentParagraphIndex < this.paragraphs.length) {
          const paragraphText = this.paragraphs[this.currentParagraphIndex].textContent.trim();
          if (paragraphText) {
            if (!this.isTextSelected()) {
              const textToSpeechURL = this.createAudioUrl(paragraphText);
              const { current } = this.getAudios()
              current.src = textToSpeechURL;
              current.play();
            } else {
              const { current } = this.getAudios()
              current.currentTime = 0;
              current.play();
            }
          }
        } else {
          this.isReading = false;
        }
      }

      audioPlay = () => {
        if (this.paragraphs.length === 0 || !this.paragraphs[this.currentParagraphIndex]) return
        const paragraph = this.paragraphs[this.currentParagraphIndex];
        this.range.selectNodeContents(paragraph);
        this.selection.removeAllRanges();
        this.selection.addRange(this.range);
        paragraph.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
        if (!this.isReading || !this.paragraphs[this.currentParagraphIndex + 1] ) return;

        const paragraphText = this.paragraphs[this.currentParagraphIndex + 1].textContent.trim();
        const textToSpeechURL = this.createAudioUrl(paragraphText);
        const { next } = this.getAudios()
        next.src = textToSpeechURL;
      }

      audioEnded = () => {
        if (this.selection && this.currentParagraphIndex + 1 === this.paragraphs.length) {
          this.selection.removeAllRanges();
        }

        if (!this.isReading && this.stopReading) {
           this.stopReading();
          return;
        }
        const { next } = this.getAudios()
        next.play();
        this.currentParagraphIndex++;
        if (this.currentParagraphIndex === this.paragraphs.length - 1) {
          this.isReading = false;
        }
      }

      startReading () {
        if (!this.isReading) {
          this.isReading = true;
          if (!this.isTextSelected()) {
            this.currentParagraphIndex = this.getFirstVisibleIndex()
          }
          this.readCurrentParagraph();
        }
      }

      stopReading () {
        const { current } = this.getAudios()
        current.pause();
        this.isReading = false;
      }
      destroy() {
        // 停止正在播放的音频
        const { current } = this.getAudios();
        current.pause();
    
        // 移除所有事件监听器
        this.audioElement.removeEventListener('play', this.audioPlay);
        this.audioElement.removeEventListener('ended', this.audioEnded);
        this.audioElement1.removeEventListener('play', this.audioPlay);
        this.audioElement1.removeEventListener('ended', this.audioEnded);
        this.audioElement.removeEventListener('timeupdate', this.handleTimeUpdate);
        this.audioElement1.removeEventListener('timeupdate', this.handleTimeUpdate);
    
        // 清空文本选择
        this.selection.removeAllRanges();
    
        // 将 isReading 标志设置为 false
        this.isReading = false;
    
        // 清空其他状态
        this.currentParagraphIndex = 0;
    
        // 清空文本和元素引用
        this.paragraphs = [];
        this.textToRead = null;
      }

    }




