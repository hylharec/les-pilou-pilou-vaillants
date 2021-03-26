@namespace
class SpriteKind:
    decor = SpriteKind.create()
    UI = SpriteKind.create()
def charger_niveau1():
    global mechant1
    tiles.set_tilemap(tilemap("""
        level1
    """))
    controller.move_sprite(Fermiere)
    scene.camera_follow_sprite(Fermiere)
    mechant1 = sprites.create(assets.image("""
        tracteur
    """), SpriteKind.enemy)
    mechant1.set_position(154, 28)
def charger_village():
    global maison1, maison2
    tiles.set_tilemap(tilemap("""
        village
    """))
    controller.move_sprite(Fermiere)
    scene.camera_follow_sprite(Fermiere)
    maison1 = sprites.create(assets.image("""
        maison
    """), SpriteKind.decor)
    maison1.set_position(70, 100)
    maison2 = sprites.create(assets.image("""
        maison2
    """), SpriteKind.decor)
    maison2.set_position(185, 100)
def charger_niveau2():
    global mechant1
    tiles.set_tilemap(tilemap("""
        level7
    """))
    controller.move_sprite(Fermiere)
    scene.camera_follow_sprite(Fermiere)
    mechant1 = sprites.create(assets.image("""
        tracteur
    """), SpriteKind.enemy)
    mechant1.set_position(154, 28)
def dans_niveau2():
    global niveau1_trigger_mechant1, niveau
    if distance(Fermiere, mechant1) < 50:
        if niveau1_trigger_mechant1 == 0:
            niveau1_trigger_mechant1 = 1
            game.show_long_text("EH EH EH !", DialogLayout.BOTTOM)
            game.show_long_text("Alors tu veux retrouver ta poule aux oeufs d'or ?",
                DialogLayout.BOTTOM)
            game.show_long_text("Il va d'abord falloir me battre !!", DialogLayout.BOTTOM)
            game.show_long_text("EH EH EH EH !!", DialogLayout.BOTTOM)
    if Fermiere.tile_kind_at(TileDirection.CENTER, assets.tile("""
        vers_niveau1
    """)):
        maison1.destroy()
        maison2.destroy()
        charger_village()
        Fermiere.set_position(25, 103)
        niveau = 0
def charger_combat(mechant: Sprite):
    tiles.set_tilemap(tilemap("""
        combat
    """))
    controller.move_sprite(Fermiere)
    scene.camera_follow_sprite(Fermiere)
    mechant.set_position(151, 42)
def distance(player2: Sprite, target: Sprite):
    global buffer
    buffer = Math.sqrt((player2.x - target.x) ** 2 + (player2.y - target.y) ** 2)
    return buffer
def dans_niveau1():
    global niveau1_trigger_mechant1, niveau
    if distance(Fermiere, mechant1) < 50:
        if niveau1_trigger_mechant1 == 0:
            niveau1_trigger_mechant1 = 1
            game.show_long_text("EH EH EH !", DialogLayout.BOTTOM)
            game.show_long_text("Alors tu veux retrouver ta poule aux oeufs d'or ?",
                DialogLayout.BOTTOM)
            game.show_long_text("Il va d'abord falloir me battre !!", DialogLayout.BOTTOM)
            game.show_long_text("EH EH EH EH !!", DialogLayout.BOTTOM)
    if Fermiere.tile_kind_at(TileDirection.CENTER, assets.tile("""
        vers_niveau1
    """)):
        mechant1.destroy()
        charger_village()
        Fermiere.set_position(124, 20)
        niveau = 0
def dans_le_village():
    global niveau
    if Fermiere.tile_kind_at(TileDirection.CENTER, assets.tile("""
        vers_niveau1
    """)):
        maison1.destroy()
        maison2.destroy()
        if Fermiere.x > 50:
            charger_niveau1()
            Fermiere.set_position(127, 235)
            niveau = 1
        else:
            charger_niveau2()
            Fermiere.set_position(240, 201)
            niveau = 2
def dans_combat():
    pass
buffer = 0
niveau1_trigger_mechant1 = 0
maison2: Sprite = None
maison1: Sprite = None
mechant1: Sprite = None
Fermiere: Sprite = None
niveau = 0
scene.set_background_color(9)
niveau = 0
Fermiere = sprites.create(assets.image("""
    joueur
"""), SpriteKind.player)
Fermiere.set_position(127, 201)
vie = sprites.create(assets.image("""
    pepsi
"""), SpriteKind.UI)
charger_village()

def on_on_update():
    vie.set_position(scene.camera_property(CameraProperty.X) - 40,
        scene.camera_property(CameraProperty.Y) - 45)
game.on_update(on_on_update)

def on_on_update2():
    if niveau == 0:
        dans_le_village()
    elif niveau == 1:
        dans_niveau1()
    elif niveau == 2:
        dans_niveau2()
    else:
        pass
game.on_update(on_on_update2)
