controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    adam_player.setImage(img`
        . . . . . f f f f f f . . . . . 
        . . . f f e e e e f 2 f . . . . 
        . . f f e e e e f 2 2 2 f . . . 
        . . f e e e f f e e e e f . . . 
        . . f f f f e e 2 2 2 2 e f . . 
        . . f e 2 2 2 f f f f e 2 f . . 
        . f f f f f f f e e e f f f . . 
        . f f e 4 4 e b f 4 4 e e f . . 
        . f e e 4 d 4 1 f d d e f f . . 
        . . f e e e 4 d d d d f d d f . 
        . . . f f e e 4 e e e f b b f . 
        . . . . f 2 2 2 4 d d e b b f . 
        . . . . e 2 2 2 e d d e b f . . 
        . . . . f 4 4 4 f e e f f . . . 
        . . . . . f f f f f f . . . . . 
        . . . . . . f f f . . . . . . . 
        `)
    music.pewPew.play()
    swordSwung = true
    pause(100)
    adam_player.setImage(assets.image`adamSprite`)
    swordSwung = false
})
function playerHealthChange (isIncrease: boolean, howMuch: number) {
    _currentHitPoint = statusbar.value
    if (isIncrease) {
        _currentHitPoint = _currentHitPoint + howMuch
    } else {
        _currentHitPoint = _currentHitPoint - howMuch
    }
    statusbar.value = _currentHitPoint
}
statusbars.onZero(StatusBarKind.EnemyHealth, function (status) {
    game.over(true)
})
function moveLevel (level: number) {
    if (level == 1) {
        scene.setBackgroundImage(assets.image`SpaceBackground`)
        bad_guy_1 = sprites.create(assets.image`SpaceShip`, SpriteKind.Enemy)
        bad_guy_1_statusbar = statusbars.create(30, 4, StatusBarKind.EnemyHealth)
        bad_guy_1_statusbar.attachToSprite(bad_guy_1)
        bad_guy_1_statusbar.value = 100
        bad_guy_1_statusbar.setLabel("Ibu")
        bad_guy_1_statusbar.setColor(2, 15)
        adam_player.setPosition(10, 100)
        bad_guy_1.setBounceOnWall(true)
        bad_guy_1.setPosition(140, 100)
    }
}
function enemyHealthChange (isIncrease: boolean, howMuch: number) {
    _currentHitPoint = bad_guy_1_statusbar.value
    if (isIncrease) {
        _currentHitPoint = _currentHitPoint + howMuch
    } else {
        _currentHitPoint = _currentHitPoint - howMuch
    }
    bad_guy_1_statusbar.value = _currentHitPoint
}
statusbars.onZero(StatusBarKind.Health, function (status) {
    game.over(false)
})
function showDialog (dialogText: string) {
    game.showLongText(dialogText, DialogLayout.Top)
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    if (swordSwung == true) {
        if (current_level == 0) {
            otherSprite.destroy(effects.ashes, 200)
            numberOfEnemies += -1
        }
        if (current_level == 1) {
            enemyHealthChange(false, 2)
        }
    } else {
        playerHealthChange(false, 1)
    }
})
let bad_guy_1_statusbar: StatusBarSprite = null
let bad_guy_1: Sprite = null
let _currentHitPoint = 0
let swordSwung = false
let statusbar: StatusBarSprite = null
let current_level = 0
let adam_player: Sprite = null
scene.setBackgroundImage(assets.image`CityBackground`)
tiles.setTilemap(tilemap`level0`)
game.setDialogFrame(img`
    ..................................................................
    ....33.......33...........dddd............dddd............aaa.....
    ...a533.....393....ddddddd1111d....ddddddd1111d....3333...a35a....
    ...a553aaa339993.dd1111dd111111dddd1111dd111111dd.39393aaa3553aa..
    ..a355555a3999993d11911111111111dd11911111111111d339993a555555553.
    .a555555333399933119991111111111111999111111111113999993a55555533.
    .a355555333393931111911111115511111191111111551111399933a3555533..
    .aa355555a1333311111111111115511111111111111551111339331a55555a...
    ...a55355a1111111111111111111111111111111111111111133311a55335a...
    ...a5aaaaa1111191111111111111111111111111111111111111111aaa33aa...
    ...aa3311115511111111111111111111111111111111111119111111113333...
    ..3339331115511111111111111111111111111111111111111111551133393...
    ..39999331111111111111111111111111111111111111111111115511399993..
    ..339999311111111111111111111111111111111111111111111111113399993.
    ..399993311111111111111111111111111111111111111111111111113999933.
    ...339331191111111111111111111111111111111111111111111119113393...
    ....3311111111111111111111111111111111111111111111111111111133....
    ...dd11111111111111111111111111111111111111111111111111111111dd...
    ...d1111111111111111111111111111111111111111111111111111111111d...
    ..d111111111111111111111111111111111111111111111111111111111911d..
    .d1111551111111111111111111111111111111111111111111111111119991d..
    .d1111551111111111111111111111111111111111111111111111111111911d..
    .d1111111111111111111111111111111111111111111111111111111111111d..
    .d111111111111111111111111111111111111111111111111111111111111dd..
    ..d11111111111111111111111111111111111111111111111111111111111dd..
    ..dd11111111111111111111111111111111111111111111111111111111111d..
    ..dd111111111111111111111111111111111111111111111111111111111111d.
    ..d1111111111111111111111111111111111111111111111111111111111111d.
    ..d1191111111111111111111111111111111111111111111111111111551111d.
    ..d1999111111111111111111111111111111111111111111111111111551111d.
    ..d119111111111111111111111111111111111111111111111111111111111d..
    ...d1111111111111111111111111111111111111111111111111111111111d...
    ...dd11111111111111111111111111111111111111111111111111111111dd...
    ...dd11111111111111111111111111111111111111111111111111111111dd...
    ...d1111111111111111111111111111111111111111111111111111111111d...
    ..d111111111111111111111111111111111111111111111111111111111911d..
    .d1111551111111111111111111111111111111111111111111111111119991d..
    .d1111551111111111111111111111111111111111111111111111111111911d..
    .d1111111111111111111111111111111111111111111111111111111111111d..
    .d111111111111111111111111111111111111111111111111111111111111dd..
    ..d11111111111111111111111111111111111111111111111111111111111dd..
    ..dd11111111111111111111111111111111111111111111111111111111111d..
    ..dd111111111111111111111111111111111111111111111111111111111111d.
    ..d1111111111111111111111111111111111111111111111111111111111111d.
    ..d1191111111111111111111111111111111111111111111111111111551111d.
    ..d1999111111111111111111111111111111111111111111111111111551111d.
    ..d119111111111111111111111111111111111111111111111111111111111d..
    ...d1111111111111111111111111111111111111111111111111111111111d...
    ...dd11111111111111111111111111111111111111111111111111111111dd...
    ....3311111111111111111111111111111111111111111111111111111133....
    ...393311911111111111111111111111111111111111111111111191133933...
    .339999311111111111111111111111111111111111111111111111113399993..
    .399993311111111111111111111111111111111111111111111111113999933..
    ..39999311551111111111111111111111111111111111111111111113399993..
    ...3933311551111111111111111111111111111111111111111155111339333..
    ...3333111111119111111111111111111111111111111111111155111133aa...
    ...aa33aaa1111111111111111111111111111111111111111911111aaaaa5a...
    ...a53355a1133311111111111111111111111111111111111111111a55355a...
    ...a55555a1339331111551111111111111155111111111111133331a555553aa.
    ..3355553a339993111155111111191111115511111119111139393333555553a.
    .33555555a399999311111111111999111111111111199911339993333555555a.
    .355555555a399933d11111111111911dd11111111111911d3999993a555553a..
    ..aa3553aaa39393.dd111111dd1111dddd111111dd1111dd.399933aaa355a...
    ....a53a...3333....d1111ddddddd....d1111ddddddd....393.....335a...
    .....aaa............dddd............dddd...........33.......33....
    ..................................................................
    `)
adam_player = sprites.create(assets.image`adamSprite`, SpriteKind.Player)
adam_player.setPosition(10, 100)
adam_player.setBounceOnWall(true)
controller.moveSprite(adam_player, 50, 20)
let numberOfEnemies = 3
current_level = 0
let bad_guy_0 = sprites.create(assets.image`bat`, SpriteKind.Enemy)
bad_guy_0.setPosition(140, 100)
bad_guy_0.setBounceOnWall(true)
bad_guy_0.follow(adam_player, 5)
let bad_guy_0_1 = sprites.create(assets.image`bat`, SpriteKind.Enemy)
bad_guy_0_1.setPosition(140, 100)
bad_guy_0_1.setBounceOnWall(true)
bad_guy_0_1.follow(adam_player, 5)
showDialog("Welcome to the city, Adam !")
statusbar = statusbars.create(20, 4, StatusBarKind.Health)
statusbar.attachToSprite(adam_player)
statusbar.value = 160
statusbar.setLabel("Adam")
statusbar.setColor(9, 2)
game.onUpdate(function () {
    if (adam_player.isHittingTile(CollisionDirection.Right)) {
        current_level += 1
        moveLevel(current_level)
    }
})
forever(function () {
    pause(500)
    bad_guy_0.x += randint(-10, 10)
    bad_guy_0.y += randint(-5, 5)
    bad_guy_0_1.x += randint(-10, 10)
    bad_guy_0_1.y += randint(-5, 5)
    if (current_level == 1) {
        bad_guy_1.x += randint(-10, 2)
        bad_guy_1.y += randint(-2, 2)
    }
    if (numberOfEnemies == 0) {
        game.over(true)
    }
})
