
function VerticalNavbar() {


    return (
        <aside class="bg-gray-800 text-white w-64 min-h-screen p-4">
            <nav>
                <ul class="space-y-2">
                    <li class="opcion-con-desplegable">
                        <div class="flex items-center justify-between p-2 hover:bg-gray-700">
                            <div class="flex items-center">
                                <i class="fas fa-calendar-alt mr-2"></i>
                                <span>Agenda</span>
                            </div>
                            <i class="fas fa-chevron-down text-xs"></i>
                        </div>
                        <ul class="desplegable ml-4 hidden">
                            <li>
                                <a href="#" class="block p-2 hover:bg-gray-700 flex items-center">
                                    <i class="fas fa-chevron-right mr-2 text-xs"></i>
                                    Gestion de citas
                                </a>
                            </li>
                            <li>
                                <a href="#" class="block p-2 hover:bg-gray-700 flex items-center">
                                    <i class="fas fa-chevron-right mr-2 text-xs"></i>
                                    Polizas
                                </a>
                            </li>
                        </ul>
                    </li>
                    <li class="opcion-con-desplegable">
                        <div class="flex items-center justify-between p-2 hover:bg-gray-700">
                            <div class="flex items-center">
                                <i class="fas fa-money-bill-wave mr-2"></i>
                                <span>Contabilidad</span>
                            </div>
                            <i class="fas fa-chevron-down text-xs"></i>
                        </div>
                        <ul class="desplegable ml-4 hidden">
                            <li>
                                <a href="#" class="block p-2 hover:bg-gray-700 flex items-center">
                                    <i class="fas fa-chevron-right mr-2 text-xs"></i>
                                    Tratamientos
                                </a>
                            </li>
                            <li>
                                <a href="#" class="block p-2 hover:bg-gray-700 flex items-center">
                                    <i class="fas fa-chevron-right mr-2 text-xs"></i>
                                    Gastos
                                </a>
                            </li>
                            <li>
                                <a href="#" class="block p-2 hover:bg-gray-700 flex items-center">
                                    <i class="fas fa-chevron-right mr-2 text-xs"></i>
                                    Facturas
                                </a>
                            </li>
                        </ul>
                    </li>
                    <li class="opcion-con-desplegable">
                        <div class="flex items-center justify-between p-2 hover:bg-gray-700">
                            <div class="flex items-center">
                                <i class="fas fa-chart-bar mr-2"></i>
                                <span>Informes</span>
                            </div>
                            <i class="fas fa-chevron-down text-xs"></i>
                        </div>
                        <ul class="desplegable ml-4 hidden">
                            <li>
                                <a href="#" class="block p-2 hover:bg-gray-700 flex items-center">
                                    <i class="fas fa-chevron-right mr-2 text-xs"></i>
                                    Presupuestos
                                </a>
                            </li>
                            <li>
                                <a href="#" class="block p-2 hover:bg-gray-700 flex items-center">
                                    <i class="fas fa-chevron-right mr-2 text-xs"></i>
                                    Informe médico
                                </a>
                            </li>
                        </ul>
                    </li>
                    <li class="opcion-con-desplegable">
                        <div class="flex items-center justify-between p-2 hover:bg-gray-700">
                            <div class="flex items-center">
                                <i class="fas fa-file-alt mr-2"></i>
                                <span>Documentación</span>
                            </div>
                            <i class="fas fa-chevron-down text-xs"></i>
                        </div>
                        <ul class="desplegable ml-4 hidden">
                            <li>
                                <a href="#" class="block p-2 hover:bg-gray-700 flex items-center">
                                    <i class="fas fa-chevron-right mr-2 text-xs"></i>
                                    Firmas pendientes
                                </a>
                            </li>
                            <li>
                                <a href="#" class="block p-2 hover:bg-gray-700 flex items-center">
                                    <i class="fas fa-chevron-right mr-2 text-xs"></i>
                                    Documentos
                                </a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </nav>
        </aside>

    )


}

export default VerticalNavbar; 