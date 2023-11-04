<template lang="">
    <div class="emoji-list">
        <div class="scroller h-100">
            <div class="d-flex justify-between align-center flex-wrap">
                <span @click="getEmoji('😬')" class="py-2 px-3">😀</span>
                <span @click="getEmoji('😬')" class="py-2 px-3">😬</span>
                <span @click="getEmoji('😁')" class="py-2 px-3">😁</span>
                <span @click="getEmoji('😂')" class="py-2 px-3">😂</span>
                <span @click="getEmoji('😅')" class="py-2 px-3">😅</span>
                <span @click="getEmoji('😄')" class="py-2 px-3">😄</span>
                <span @click="getEmoji('😇')" class="py-2 px-3">😇</span>
                <span @click="getEmoji('😉')" class="py-2 px-3">😉</span>
                <span @click="getEmoji('😊')" class="py-2 px-3">😊</span>
                <span @click="getEmoji('😋')" class="py-2 px-3">😋</span>
                <span @click="getEmoji('😌')" class="py-2 px-3">😌</span>
                <span @click="getEmoji('😍')" class="py-2 px-3">😍</span>
                <span @click="getEmoji('😘')" class="py-2 px-3">😘</span>
                <span @click="getEmoji('😜')" class="py-2 px-3">😜</span>
                <span @click="getEmoji('🤓')" class="py-2 px-3">🤓</span>
                <span @click="getEmoji('😎')" class="py-2 px-3">😎</span>
                <span @click="getEmoji('🤔')" class="py-2 px-3">🤔</span>
                <span @click="getEmoji('😳')" class="py-2 px-3">😳</span>
                <span @click="getEmoji('😠')" class="py-2 px-3">😠</span>
                <span @click="getEmoji('😡')" class="py-2 px-3">😡</span>
                <span @click="getEmoji('😔')" class="py-2 px-3">😔</span>
                <span @click="getEmoji('😕')" class="py-2 px-3">😕</span>
                <span @click="getEmoji('🙁')" class="py-2 px-3">🙁</span>
                <span @click="getEmoji('😯')" class="py-2 px-3">😯</span>
                <span @click="getEmoji('😱')" class="py-2 px-3">😱</span>
                <span @click="getEmoji('😨')" class="py-2 px-3">😨</span>
                <span @click="getEmoji('😰')" class="py-2 px-3">😰</span>
                <span @click="getEmoji('😢')" class="py-2 px-3">😢</span>
                <span @click="getEmoji('😥')" class="py-2 px-3">😥</span>
                <span @click="getEmoji('😭')" class="py-2 px-3">😭</span>
                <span @click="getEmoji('😓')" class="py-2 px-3">😓</span>
                <span @click="getEmoji('😵')" class="py-2 px-3">😵</span>
                <span @click="getEmoji('😷')" class="py-2 px-3">😷</span>
                <span @click="getEmoji('🤐')" class="py-2 px-3">🤐</span>
                <span @click="getEmoji('🤒')" class="py-2 px-3">🤒</span>
                <span @click="getEmoji('🤕')" class="py-2 px-3">🤕</span>
                <span @click="getEmoji('🙌')" class="py-2 px-3">🙌</span>
                <span @click="getEmoji('👏')" class="py-2 px-3">👏</span>
                <span @click="getEmoji('👋')" class="py-2 px-3">👋</span>
                <span @click="getEmoji('👍')" class="py-2 px-3">👍</span>
                <span @click="getEmoji('👎')" class="py-2 px-3">👎</span>
                <span @click="getEmoji('👊')" class="py-2 px-3">👊</span>
                <span @click="getEmoji('💪')" class="py-2 px-3">💪</span>
                <span @click="getEmoji('🙏')" class="py-2 px-3">🙏</span>
                <span @click="getEmoji('🗣')" class="py-2 px-3">🗣</span>
                <span @click="getEmoji('🚶')" class="py-2 px-3">🚶</span>
                <span @click="getEmoji('🙇')" class="py-2 px-3">🙇</span>
                <span @click="getEmoji('💁')" class="py-2 px-3">💁</span>
                <span @click="getEmoji('🙅')" class="py-2 px-3">🙅</span>
                <span @click="getEmoji('🙆')" class="py-2 px-3">🙆</span>
                <span @click="getEmoji('🙋')" class="py-2 px-3">🙋</span>
                <span @click="getEmoji('🌹')" class="py-2 px-3">🌹</span>
                <span @click="getEmoji('🌷')" class="py-2 px-3">🌷</span>
                <span @click="getEmoji('🌼')" class="py-2 px-3">🌼</span>
                <span @click="getEmoji('🌺')" class="py-2 px-3">🌺</span>
                <span @click="getEmoji('🌸')" class="py-2 px-3">🌸</span>
                <span @click="getEmoji('🌻')" class="py-2 px-3">🌻</span>
                <span @click="getEmoji('🔥')" class="py-2 px-3">🔥</span>
                <span @click="getEmoji('📞')" class="py-2 px-3">📞</span>
                <span @click="getEmoji('💛')" class="py-2 px-3">💛</span>
                <span @click="getEmoji('💚')" class="py-2 px-3">💚</span>
                <span @click="getEmoji('💙')" class="py-2 px-3">💙</span>
                <span @click="getEmoji('💜')" class="py-2 px-3">💜</span>
                <span @click="getEmoji('💗')" class="py-2 px-3">💗</span>
                <span @click="getEmoji('⛔')" class="py-2 px-3">⛔</span>
                <span @click="getEmoji('🚫')" class="py-2 px-3">🚫</span>
                <span @click="getEmoji('❌')" class="py-2 px-3">❌</span>
                <span @click="getEmoji('⭕')" class="py-2 px-3">⭕</span>
                <span @click="getEmoji('❗')" class="py-2 px-3">❗</span>
                <span @click="getEmoji('💯')" class="py-2 px-3">💯</span>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    methods:{
        /**
         * Send Emoji to out
         * @param {*} sticker 
         */
        getEmoji(sticker){
            this.$emit('addSticker', sticker);
        }
    }
}
</script>