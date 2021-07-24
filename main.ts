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
        bad_guy_1_statusbar = statusbars.create(60, 4, StatusBarKind.EnemyHealth)
        bad_guy_1_statusbar.attachToSprite(bad_guy_1)
        bad_guy_1_statusbar.value = 70
        bad_guy_1_statusbar.setLabel("Ibu")
        bad_guy_1_statusbar.setColor(9, 2)
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
        playerHealthChange(false, 2)
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
    .....cccccccccccccc.....
    ...cbd111111111111dbc...
    ..cd1111111111111111dc..
    .cd111111111111111111dc.
    .b11111111111111111111b.
    cd11111111111111111111dc
    c1111111111111111111111c
    c1111111111111111111111c
    c1111111111111111111111c
    c1111111111111111111111c
    c1111111111111111111111c
    c1111111111111111111111c
    c1111111111111111111111c
    c1111111111111111111111c
    c1111111111111111111111c
    c1111111111111111111111c
    cd11111111111111111111dc
    cb11111111111111111111bc
    ccd111111111111111111dc.
    .ccd1111111111111111dcc.
    ..c111111111111111dbcc..
    .b11dcccccccccccccccc...
    cddcccccccccccccccc.....
    ccccc...................
    `)
adam_player = sprites.create(assets.image`adamSprite`, SpriteKind.Player)
adam_player.setPosition(10, 100)
adam_player.setBounceOnWall(true)
controller.moveSprite(adam_player, 50, 20)
let numberOfEnemies = 2
current_level = 0
let bad_guy_0 = sprites.create(assets.image`bat`, SpriteKind.Enemy)
bad_guy_0.setPosition(140, 100)
bad_guy_0.setBounceOnWall(true)
showDialog("Welcome to the city, Adam !")
statusbar = statusbars.create(20, 4, StatusBarKind.Health)
statusbar.attachToSprite(adam_player)
statusbar.value = 100
statusbar.setLabel("Adam")
statusbar.setColor(9, 2)
game.onUpdate(function () {
    if (adam_player.isHittingTile(CollisionDirection.Right)) {
        current_level += 1
        moveLevel(current_level)
    }
})
forever(function () {
    pause(1000)
    bad_guy_0.x += randint(-10, 10)
    bad_guy_0.y += randint(-5, 5)
    if (current_level == 1) {
        bad_guy_1.x += randint(-10, 2)
        bad_guy_1.y += randint(-2, 2)
    }
    if (numberOfEnemies == 0) {
        game.over(true)
    }
})
