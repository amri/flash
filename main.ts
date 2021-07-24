function moveLevel (level: number) {
    if (level == 1) {
        scene.setBackgroundImage(assets.image`SpaceBackground`)
        bad_guy_1 = sprites.create(assets.image`SpaceShip`, SpriteKind.Enemy)
        adam_player.setPosition(10, 100)
        bad_guy_1.setBounceOnWall(true)
        bad_guy_1.setPosition(140, 100)
    }
}
function showDialog (dialogText: string) {
    game.showLongText(dialogText, DialogLayout.Top)
}
function healthChange (isIncrease: boolean, howMuch: number) {
    _currentHitPoint = statusbar.value
    if (true) {
    	
    }
    statusbar.value += 0
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    game.over(true)
})
let _currentHitPoint = 0
let bad_guy_1: Sprite = null
let statusbar: StatusBarSprite = null
let adam_player: Sprite = null
scene.setBackgroundImage(assets.image`CityBackground`)
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
tiles.setTilemap(tilemap`level0`)
let current_level = 0
showDialog("Welcome to the city, Adam !")
statusbar = statusbars.create(20, 4, StatusBarKind.Health)
statusbar.attachToSprite(adam_player)
statusbar.value = 100
statusbar.setLabel("Adam")
statusbar.setColor(2, 2)
game.onUpdate(function () {
    if (adam_player.isHittingTile(CollisionDirection.Right)) {
        moveLevel(1)
    }
})
