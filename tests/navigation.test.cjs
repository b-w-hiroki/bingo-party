const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs');const html=fs.readFileSync('index.html','utf8'),css=fs.readFileSync('styles.css','utf8');
test('destinations work without JS',()=>{assert.match(html,/href="https:\/\/osanpobingo-battle.com\/"/);assert.match(html,/href="https:\/\/b-w-hiroki.github.io\/nomisuke-bingo\/"/);assert.doesNotMatch(html,/location.origin|js-game-link/)});
test('planned games are disabled',()=>assert.equal((html.match(/class="btn btn-card btn-disabled"/g)||[]).length,3));
test('cards stay visible without JS',()=>assert.match(css.match(/\.game-card \{([^}]+)/)[1],/opacity: 1/));
